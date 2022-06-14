/*!
 * This file is part of the Stooa codebase.
 *
 * (c) 2020 - present Runroom SL
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { media } from '@/ui/helpers';
import { COLOR_NEUTRO_500, COLOR_NEUTRO_600 } from '@/ui/settings';
import { BODY_SM, BODY_XS } from '@/ui/Texts';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: relative;
`;

const StyledButtonReaction = styled.button`
  position: relative;
  line-height: 0;
  margin: 0 auto;
  color: ${COLOR_NEUTRO_600};

  & > svg {
    transform: translateY(-3px);
  }

  & > .label {
    ${BODY_XS}
    line-height: 0.875;

    ${media.min('tablet')`
      ${BODY_SM}
      line-height: 0.8;
    `}
  }

  &:disabled {
    cursor: default;
    color: ${COLOR_NEUTRO_500};

    & > svg {
      opacity: 0.5;
    }
  }

  & > .cross {
    position: absolute;
    top: 0;
    right: 0;
    transform: rotate(45deg);
    width: 20px;
    height: 20px;
    z-index: 1;

    & > svg path {
      fill: currentColor;
      stroke: white;
      stroke-width: 2px;
      stroke-linejoin: round;
    }
  }
`;

export { StyledButtonReaction, StyledWrapper };
