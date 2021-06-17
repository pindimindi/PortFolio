import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Wrapper from './styled/Wrapper';
import Container from './styled/Container';
import { Image as CloudImage, Transformation, Video as CloudVideo, Placeholder } from 'cloudinary-react';
import Image from './styled/Image';
import SubTitle from './styled/SubTitle';
import Text from './styled/Text';
import Badge from './styled/Badge';
import Meta from './styled/Meta';
import Button from './styled/Button';
import Link from './styled/Link';
import Icon from './styled/Icon';
import Message from './styled/Message';
import Grid from './styled/Grid';
import HorizontalRule from './styled/HorizontalRule';
import Modal from './styled/Modal';
import Video from './styled/Video';
import MediaPlaceholder from './styled/MediaPlaceholder';

import instagram from '../images/instagram.svg';
import facebook from '../images/facebook-2.svg';
import youtube from '../images/youtube.svg';
import website from '../images/global.svg';
import plus from '../images/plus.svg';
import more from '../images/more.svg'

import { getMyPortfolio, getPortfolio } from '../actions/portfolio';
import { getPosts } from '../actions/posts';
import Title from './styled/Title';

const BorderedContainer = styled(Container)`
        border-bottom: 1px solid #E7E9EA;
        padding: 20px 5px;

        >*{
            margin: auto 5px;
        }
    `;

const Span = styled.span`
        font-size: 12px;
        font-weight: bold;
    `;

const Portfolio = ({ portfolio, getMyPortfolio,
    getPortfolio, getPosts,
    posts, location, match, user }) => {

    const [show, setShow] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);

    useEffect(() => {
        location.pathname === '/portfolio/me' ?
            getMyPortfolio() : getPortfolio(match.params.portfolioId);
    }, []);

    useEffect(() => {
        const portfolioId = portfolio && portfolio._id;
        portfolioId && getPosts(portfolioId);
    }, [portfolio]);

    const instagramUrl = portfolio && (portfolio.social.instagram || 'https://www.instagram.com/404');
    const facebookUrl = portfolio && (portfolio.social.facebook || 'https://www.facebook.com/404');
    const youtubeUrl = portfolio && (portfolio.social.youtube || 'https://www.youtube.com/404');

    const isMe = portfolio && user && portfolio.user._id === user._id;

    return (
        <Wrapper width='60%'>
            <Modal show={show} onClose={e => setShow(false)}>
                {currentPost && currentPost.type === 'video' ?
                    <Video width='55%'>
                        <CloudVideo cloudName='portfolioupload'
                            publicId={currentPost && currentPost.media}
                            fallbackContent='Your browser does not support HTML5 video tags.'
                            controls='true'
                            loop='true'
                            autoplay='true'
                        >
                        </CloudVideo>
                    </Video> :
                    <Image width='55%'>
                        <CloudImage cloudName='portfolioupload'
                            publicId={currentPost && currentPost.media}
                            width='300'
                            height='auto'
                        >
                            <Placeholder
                                type='predominant'
                            />
                        </CloudImage>
                    </Image>
                }
                <Container width='45%' padding='0' direction='column'>
                    <BorderedContainer left>
                        <Container left padding='0'>
                            <Image round width='30px' height='30px'>
                                <CloudImage cloudName='portfolioupload' publicId={portfolio && portfolio.profilePicture}>
                                    <Transformation gravity='auto' aspect-ratio='1:1' crop="fill" quality='80' />
                                </CloudImage>
                            </Image>
                            <SubTitle size='12px' weight='bold'>{portfolio && portfolio.user.name}</SubTitle>
                        </Container>
                        <Icon width='17px' height='13px'>
                            <img src={more} />
                        </Icon>
                    </BorderedContainer>
                    <Container>
                        <Container>
                            <Image round width='30px' height='30px'>
                                <CloudImage cloudName='portfolioupload' publicId={portfolio && portfolio.profilePicture}>
                                    <Transformation gravity='auto' aspect-ratio='1:1' crop="fill" quality='80' />
                                </CloudImage>
                            </Image>
                        </Container>
                        <Span>{portfolio && portfolio.user.name}</Span>
                        <Text>{portfolio && portfolio.description}</Text>

                    </Container>
                </Container>
            </Modal>

            <Container left>
                <Container width='auto'>
                    <Image round width='150px' height='150px'>
                        <CloudImage cloudName='portfolioupload' publicId={portfolio && portfolio.profilePicture}>
                            <Transformation gravity='auto' aspect-ratio='1:1' crop="fill" quality='60' />
                        </CloudImage>
                    </Image>
                </Container>
                <Container direction='column' padding='10px 10%'>
                    <Container left>
                        <SubTitle>{portfolio && portfolio.user.name}</SubTitle>
                        <Button secondary>{isMe ? 'Edit Portfolio' : 'Message'}</Button>
                        {isMe &&
                            <Link to={`/uploadMedia/${portfolio && portfolio._id}`}>
                                <Icon width='16px' height='16px'>
                                    <img src={plus} />
                                </Icon>
                            </Link>
                        }
                    </Container>
                    <Container>
                        <Meta>{portfolio && portfolio.location.city}</Meta>
                        <Meta>{portfolio && portfolio.location.state}</Meta>
                        <Meta>{portfolio && portfolio.location.country}</Meta>
                    </Container>
                    <Text scrollable height='60px' align='start'>
                        {portfolio && portfolio.description}
                    </Text>
                    <Container left>
                        <a target='_blank' href={instagramUrl}>
                            <Badge>
                                <img src={instagram} />
                            </Badge>
                        </a>
                        <a target='_blank' href={facebookUrl}>
                            <Badge>
                                <img src={facebook} />
                            </Badge>
                        </a>
                        <a target='_blank' href={youtubeUrl}>
                            <Badge>
                                <img src={youtube} />
                            </Badge>
                        </a>
                        <a target='_blank' href={portfolio && portfolio.website}>
                            <Badge>
                                <img src={website} />
                            </Badge>
                        </a>
                    </Container>
                </Container>
            </Container>
            <HorizontalRule />
            <Grid>
                {posts && posts.map(post => (
                    <Image width='92%' key={post._id} videoThumbnail={post.type === 'video'} onClick={e => { setCurrentPost(post); setShow(true) }}>
                        <CloudImage
                            cloudName='portfolioupload'
                            publicId={post.type === 'video' ? post.media + '.png' : post.media}
                            resourceType={post.type}
                            loading='lazy'
                            width='100%'
                            height='auto'>
                            <Transformation
                                gravity='auto'
                                aspect-ratio='1:1'
                                crop="fill" quality='60' />
                            <Placeholder
                                type='predominant'
                            />
                        </CloudImage>
                    </Image>
                ))}
            </Grid>
        </Wrapper>
    )
};

const mapStateToProps = state => ({
    portfolio: state.portfolio.portfolio,
    posts: state.posts,
    user: state.auth.user
});

export default connect(mapStateToProps, { getMyPortfolio, getPortfolio, getPosts })(Portfolio);