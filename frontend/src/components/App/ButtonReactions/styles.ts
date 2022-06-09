/*!
 * This file is part of the Stooa codebase.
 *
 * (c) 2020 - present Runroom SL
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { COLOR_NEUTRO_500, COLOR_NEUTRO_600 } from '@/ui/settings';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  /* position: relative; */
`;

const StyledButtonReaction = styled.button`
  line-height: 0;
  margin: 0;
  color: ${COLOR_NEUTRO_600};

  & > svg {
    transform: translateY(-3px);
  }

  & > span {
    line-height: 0.8;
  }

  &:disabled {
    color: ${COLOR_NEUTRO_500};

    & > svg {
      opacity: 0.5;
    }
  }
`;

export { StyledButtonReaction, StyledWrapper };
