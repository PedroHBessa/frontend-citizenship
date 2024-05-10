import styled from 'styled-components';
import { grayScale } from 'theme/variants';
import { FamilyMemberStatus } from 'types/State';

interface AvatarProps {
  avatar?: string;
  deathDate?: Date | null;
  country?: string;
  status?: string;
}

const Flag = styled.div`
  width: 32px;
  height: 22px;
  position: absolute;
  overflow: hidden;
  bottom: 10px;
  right: 10px;
  border: 1px solid white;
  background: white;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
  & img {
    margin-top: -5px;
  }
`;

type ComponentProps = { isPassed: boolean; status?: string };

const Component = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isPassed',
})<ComponentProps>`
  position: absolute;
  transform: translateY(-50%);
  & > img {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    border: 10px solid
      ${(props) =>
        props.status === FamilyMemberStatus.NOT_FROM_LINEAGE
          ? grayScale[60]
          : 'white'};
    filter: grayscale(${(props) => (props.isPassed ? 1 : 0)});
  }
`;

export function Avatar({ avatar, deathDate, country, status }: AvatarProps) {
  return avatar ? (
    <>
      <Component isPassed={!!deathDate} status={status}>
        <img alt='Avatar' src={avatar} />
        {country && (
          <Flag>
            <img
              alt='Flag'
              src={`https://flagsapi.com/${country.substring(0, 2).toLocaleUpperCase()}/flat/32.png`}
            />
          </Flag>
        )}
      </Component>
    </>
  ) : (
    <></>
  );
}

export default Avatar;
