import React from 'react';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, RedditShareButton, EmailShareButton } from 'react-share';

const SocialShare = ({ url, title }) => {
  return (
    <div className="social-share">
      <div className="flex space-x-8">
        <FacebookShareButton
            url={url}
            quote={title}
            style={{
            backgroundColor: '#1877f2',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            }}
        >
            Share on Facebook
        </FacebookShareButton>

        <TwitterShareButton
            url={url}
            title={title}
            style={{
            backgroundColor: '#1da1f2',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            }}
        >
            Share on Twitter
        </TwitterShareButton>

        <LinkedinShareButton
            url={url}
            title={title}
            style={{
            backgroundColor: '#2867b2',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            }}
        >
            Share on LinkedIn
        </LinkedinShareButton>

        <WhatsappShareButton
            url={url}
            title={title}
            style={{
            backgroundColor: '#25d366',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            }}
        >
            Share on Whatsapp
        </WhatsappShareButton>

        <EmailShareButton
        url={url}
        title={title}
        style={{
            backgroundColor: '#0073e6', // Change the background color as desired
            color: 'white', // Change the text color as desired
            padding: '8px 16px',
            borderRadius: '4px',
        }}
        >
        Share as Email
        </EmailShareButton>

        <RedditShareButton
        url={url}
        title={title}
        style={{
            backgroundColor: '#FF4500', // Change the background color as desired
            color: 'white', // Change the text color as desired
            padding: '8px 16px',
            borderRadius: '4px',
        }}
        >
        Share on Reddit
        </RedditShareButton>

        </div>

    </div>
  );
};

export default SocialShare;