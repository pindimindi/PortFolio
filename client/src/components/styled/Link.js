import styled, { css } from 'styled-components';
import { Link as ReactRouterDomLink } from 'react-router-dom';

const Link = ({ isActive, children, secondary, ...props }) => {
    return (
        <ReactRouterDomLink {...props}>{children}</ReactRouterDomLink>
    )
};

const StyledLink = styled(Link)`
    color: #bf9a3c;
    margin: ${props => props.margin};
    ${({ secondary }) =>
        secondary && css`
        color: black;
        text-decoration: none;
      `
    }
`;

export default StyledLink;