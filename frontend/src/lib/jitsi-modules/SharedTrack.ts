/*!
 * This file is part of the Stooa codebase.
 *
 * (c) 2020 - present Runroom SL
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import JitsiLocalTrack from 'lib-jitsi-meet/types/hand-crafted/modules/RTC/JitsiLocalTrack';
import conferenceRepository from '@/jitsi/Conference';
import { SCREEN_SHARE_STOP } from './Events';
import { dispatchEvent } from '../helpers';

const sharedTrackRepository = () => {
  let shareTrack: JitsiLocalTrack | null;

  const getShareHtmlTrack = (): HTMLElement | null => {
    return document.querySelector('#share > .share-video-wrapper');
  };

  const _createShareTrack = async track => {
    const seatHtml = document.querySelector('#share > .share-video-wrapper');
    const trackHtml = document.createElement('video');

    if (!seatHtml && trackHtml) {
      return;
    }

    trackHtml.autoplay = true;
    // ID in shareTrack is different from the other tracks because
    // is always created in the conference and we don't need it to
    // be always uniquely identified
    trackHtml.id = track.getId();

    trackHtml.setAttribute('muted', '');
    trackHtml.setAttribute('playsinline', '');
    seatHtml?.appendChild(trackHtml);

    track.attach(trackHtml);
  };

  const shareTrackAdded = track => {
    shareTrack = track;

    _createShareTrack(shareTrack);
  };

  const exitFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const removeShareTrack = async (track, location?: string) => {
    if (!track || !shareTrack) return;

    const trackHtml = getShareHtmlTrack();
    shareTrack = null;

    if (trackHtml) {
      track.detach(trackHtml);
      const video = trackHtml.querySelector('video') as HTMLElement;
      if (video) trackHtml.removeChild(video);
      track.dispose();

      dispatchEvent(SCREEN_SHARE_STOP, { location: location });
      conferenceRepository.stopScreenShareEvent();
    }

    console.log('[STOOA] Html screen share track removed');
  };

  return {
    shareTrackAdded,
    removeShareTrack,
    exitFullScreen
  };
};

export default sharedTrackRepository();
