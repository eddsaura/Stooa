/*!
 * This file is part of the Stooa codebase.
 *
 * (c) 2020 - present Runroom SL
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { render, fireEvent, screen } from '@testing-library/react';
import ReactionsSender from '@/components/App/Reactions/ReactionsSender';
import { useStooa } from '@/contexts/StooaManager';
import { useRouter } from 'next/router';

jest.mock('@/contexts/StooaManager');
jest.mock('next/router');

describe('Reactions sender component', () => {
  it('It renders the component as moderator', () => {
    useStooa.mockReturnValue({ isModerator: true });
    useRouter.mockReturnValue({ query: '' });
    const { container, getByTestId } = render(<ReactionsSender />);

    const isModeratorClassName = container.getElementsByClassName('moderator');

    expect(isModeratorClassName.length).toBe(1);

    expect(getByTestId('agree-emoji')).toBeInTheDocument();
    expect(getByTestId('disagree-emoji')).toBeInTheDocument();
    expect(getByTestId('love-emoji')).toBeInTheDocument();
    expect(getByTestId('applause-emoji')).toBeInTheDocument();
    expect(getByTestId('joy-emoji')).toBeInTheDocument();
    expect(getByTestId('wave-emoji')).toBeInTheDocument();
    expect(getByTestId('insightful-emoji')).toBeInTheDocument();
  });

  it('It renders the component as user', () => {
    useStooa.mockReturnValue({ isModerator: false });
    useRouter.mockReturnValue({ query: '' });

    const { container } = render(<ReactionsSender />);

    const isModeratorClassName = container.getElementsByClassName('moderator');

    expect(isModeratorClassName.length).toBe(0);
  });

  it('It shows emoji when clicks one', () => {
    useStooa.mockReturnValue({ isModerator: false });
    useRouter.mockReturnValue({ query: '' });

    const { getByTestId } = render(<ReactionsSender />);

    const reactionWrapper = getByTestId('reactions-wrapper');
    const agreeEmoji = getByTestId('agree-emoji');

    fireEvent.click(reactionWrapper);
    fireEvent.click(agreeEmoji);

    const shownEmoji = getByTestId('emoji-shown');

    expect(shownEmoji).toBeInTheDocument(1);
  });

  it('It shows two emoji when clicks two', () => {
    useStooa.mockReturnValue({ isModerator: false });
    useRouter.mockReturnValue({ query: '' });

    const { getByTestId, getAllByTestId } = render(<ReactionsSender />);

    const reactionWrapper = getByTestId('reactions-wrapper');
    const agreeEmoji = getByTestId('agree-emoji');

    fireEvent.click(reactionWrapper);
    fireEvent.click(agreeEmoji);
    fireEvent.click(agreeEmoji);

    const shownEmojis = getAllByTestId('emoji-shown');

    expect(shownEmojis.length).toBe(2);
  });

  it('It shows ten emoji when clicks ten times', () => {
    useStooa.mockReturnValue({ isModerator: false });
    useRouter.mockReturnValue({ query: '' });

    const { getByTestId, getAllByTestId } = render(<ReactionsSender />);

    const reactionWrapper = getByTestId('reactions-wrapper');
    const agreeEmoji = getByTestId('agree-emoji');

    fireEvent.click(reactionWrapper);

    for (let count = 0; count < 10; count++) {
      fireEvent.click(agreeEmoji);
    }

    const shownEmojis = getAllByTestId('emoji-shown');

    expect(shownEmojis.length).toBe(10);
  });

  it('It shows ten emoji when clicks 20 times', () => {
    useStooa.mockReturnValue({ isModerator: false });
    useRouter.mockReturnValue({ query: '' });

    const { getByTestId, getAllByTestId } = render(<ReactionsSender />);

    const reactionWrapper = getByTestId('reactions-wrapper');
    const agreeEmoji = getByTestId('agree-emoji');

    fireEvent.click(reactionWrapper);

    for (let count = 0; count < 20; count++) {
      fireEvent.click(agreeEmoji);
    }

    const shownEmojis = getAllByTestId('emoji-shown');

    expect(shownEmojis.length).toBe(10);
  });
});
