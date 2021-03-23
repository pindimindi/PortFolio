import styled, { css } from 'styled-components';

// const StyledCard = styled.div`
//     display: flex;
//     flex-direction: column;
//     height: ${props => props.height};
//     width: ${props => props.width};
//     border-radius: 6px;
//     background: #F2F2F2;
//     padding: 8px;

//     >div:last-of-type {
//         margin-top: auto;
//         color:#bf9a3c;
//         width: 100%;
//     }
// `;

// const Card = ({ content, extra, onClick }) => {
//     return (
//         <StyledCard onClick={onClick} width='180px' height='240px' data-testid='card'>
//             <Image card width='55%' height='40%' margin='18px auto'>
//                 <img alt="" src={content.coverPhoto} />
//             </Image>
//             <Title size='20px' color='#303C42'>{content.name}</Title>
//             {extra &&
//                 <div className='info'>
//                     <Badge>
//                         <img src={user} />
//                     </Badge>
//                     <Badge>
//                         <img src={folder} />
//                     </Badge>
//                 </div>
//             }
//         </StyledCard>
//     )
// };

const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: auto;
    width: 78%;
    padding: 10px 5px;
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    background-color: white;
        ${({ secondary }) =>
        secondary && css`
        flex-direction: row;
        padding: 15px 20px;
        width: 82%;
      `
    }
`;

export default Card;