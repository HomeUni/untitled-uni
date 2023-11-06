import React from 'react';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, RedditShareButton, EmailShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon, EmailIcon, RedditIcon } from 'react-share';

const SocialShare = ({ url, title }) => {
  return (
    <div className="social-share">
       <div className="flex  justify-center ">
        <div className="flex flex-wrap">
        <FacebookShareButton
            url={url}
            quote={title}
        >
            <FacebookIcon width={'40'} style={{marginLeft: 10}}/>
        </FacebookShareButton>

        <TwitterShareButton
            url={url}
            title={title}
            style={{marginLeft: 10}}
        >
            <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.901 0H22.581L14.541 9.19L24 21.693H16.594L10.794 14.109L4.156 21.693H0.474L9.074 11.863L0 0.00100005H7.594L12.837 6.933L18.901 0ZM17.61 19.491H19.649L6.486 2.087H4.298L17.61 19.491Z" fill="black"/>
            </svg>

           {/* <TwitterIcon width={'40'} style={{marginLeft: 10}}/> */}
        </TwitterShareButton>

        <LinkedinShareButton
            url={url}
            title={title}
        >
            <LinkedinIcon width={'40'} style={{marginLeft: 10}}/>
        </LinkedinShareButton>

        <WhatsappShareButton
            url={url}
            title={title}
        >
            <WhatsappIcon width={'40'} style={{marginLeft: 10}}/>
        </WhatsappShareButton>

        <EmailShareButton
        url={url}
        title={title}
        >
            <EmailIcon width={'40'} style={{marginLeft: 10}}/>
        </EmailShareButton>

        <RedditShareButton
        url={url}
        title={title}
        >
            <RedditIcon width={'40'} style={{marginLeft: 10}}/>
        </RedditShareButton>

        </div>

    </div>
    </div>
  );
};

export default SocialShare;