/*!
 * This file is part of the Stooa codebase.
 *
 * (c) 2020 - present Runroom SL
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import useDebounce from '@/hooks/useDebouce';
import React, { useEffect, useState } from 'react';
import { EmojiSpawner, ReactionsWrapper } from './styles';
import conferenceRepository from '@/jitsi/Conference';
import Reactions from '@/lib/Reactions/Reactions';
import { REACTION_EMOJIS } from '../ReactionsEmojis';
import ReactionEmoji from '../ReactionEmoji';
import { Reaction } from '@/types/reactions';

interface Props {
  onMouseEnter?: (mouseEvent: React.MouseEvent) => void;
  onMouseLeave?: (mouseEvent: React.MouseEvent) => void;
  className?: string;
}

const ReactionsSender = ({ onMouseLeave, className }: Props) => {
  const [disableToSendEmojis, setDisableToSendEmojis] = useState(false);
  const [clientEmojisShown, setClientEmojisShown] = useState<Reaction[]>([]);
  const [timesClicked, setTimesClicked] = useState(0);
  const [lastLocationClicked, setLastLocationClicked] = useState<number>();

  // const [emojisToSend, setEmojisToSend] = useState<string[]>([]);
  const emojisToSendRef = React.useRef<string[]>([]);
  const emojiSpawnerRef = React.useRef<HTMLDivElement>(null);

  const debouncedEmojis = useDebounce<string[]>(emojisToSendRef.current, 600);

  const spawnEmoji = (emojiToSpawn: string, xCoordinate: number): void => {
    setClientEmojisShown(reactions => [
      ...reactions,
      Reactions.createReaction(emojiToSpawn, xCoordinate)
    ]);
  };

  const spawnEmojisBatch = (emojis): void => {
    const emojisWithCoordinates = emojis.map((emoji, index) => {
      const emojiPosition = lastLocationClicked - 100 + index * 20;
      return Reactions.createReaction(emoji, emojiPosition);
    });

    setClientEmojisShown(emojisWithCoordinates);
    setDisableToSendEmojis(true);

    setTimeout(() => {
      setClientEmojisShown([]);
      setDisableToSendEmojis(false);
    }, 2000);
  };

  const handleClick = (mouseEvent: React.MouseEvent) => {
    const target = mouseEvent.currentTarget as HTMLDivElement;
    const xCoordinate = target.offsetLeft;

    const emojiCoordinate = xCoordinate + 20;

    if (target.id) {
      if (timesClicked < 10) {
        setTimesClicked(timesClicked => timesClicked + 1);
        spawnEmoji(target.id, emojiCoordinate);
      }

      emojisToSendRef.current = [...emojisToSendRef.current, target.id];
      setLastLocationClicked(emojiCoordinate);
    }
  };

  const handleOnMouseLeave = (mouseEvent: React.MouseEvent) => {
    setClientEmojisShown([]);
    onMouseLeave(mouseEvent);
  };

  useEffect(() => {
    if (debouncedEmojis.length > 0) {
      // Send here emojis to sendmessage jitsi
      const firstTenEmojis = debouncedEmojis.slice(0, 10);
      conferenceRepository.sendTextMessage(firstTenEmojis.join(','));

      if (timesClicked === 10) {
        spawnEmojisBatch(firstTenEmojis);
        emojisToSendRef.current = [];
        setTimesClicked(0);
      } else {
        // initialize client side emojis
        emojisToSendRef.current = [];
        setTimesClicked(0);
      }
    }
  }, [debouncedEmojis]);

  return (
    <ReactionsWrapper className={className} onMouseLeave={handleOnMouseLeave}>
      <EmojiSpawner ref={emojiSpawnerRef} id="emoji-spawner">
        {clientEmojisShown.length > 0 &&
          clientEmojisShown.map(reactionMapped => {
            const { id, reaction, xCoordinate, yCoordinate, animation } = reactionMapped;
            return (
              <div
                className={animation}
                key={id}
                style={{
                  position: 'absolute',
                  left: (xCoordinate as number) - 20,
                  bottom: yCoordinate
                }}
              >
                {REACTION_EMOJIS[reaction]}
              </div>
            );
          })}
      </EmojiSpawner>

      <ReactionEmoji disabled={disableToSendEmojis} emoji="agree" onClick={handleClick} />
      <ReactionEmoji disabled={disableToSendEmojis} emoji="disagree" onClick={handleClick} />
      <ReactionEmoji disabled={disableToSendEmojis} emoji="love" onClick={handleClick} />
      <ReactionEmoji disabled={disableToSendEmojis} emoji="applause" onClick={handleClick} />
      <ReactionEmoji disabled={disableToSendEmojis} emoji="joy" onClick={handleClick} />
      <ReactionEmoji disabled={disableToSendEmojis} emoji="wave" onClick={handleClick} />
      <ReactionEmoji disabled={disableToSendEmojis} emoji="insightful" onClick={handleClick} />
    </ReactionsWrapper>
  );
};

export default ReactionsSender;
