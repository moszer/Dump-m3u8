const {
    mParser,
    mDownloader,
    mIndicator,
  } = require("node-m3u8-to-mp4");
  
  const path = require("path");
    
    function force_download_m3u8(Link_, referer_){
          // Set progress indicators
        mIndicator("downloading", (index, total) => {
          console.log("downloading:" + ((index / total) * 100).toFixed(2) + "%" + " index: "+index+" "+"total: "+total);
        });
        mIndicator("converting", (index, total) => {
          console.log("converting:" + ((index / total) * 100).toFixed(2) + "%");
        });
        // Parse the video resource list
        mParser(Link_, {
          referer: referer_,
        }).then((list) => {
          // Extract the URLs from the resource list
          const medias = list.map((item) => `${item.url}`);
          console.log("Extracted");
          // Download the media files
          mDownloader(medias, {
            targetPath: path.resolve(".target"),
            headers: {
              referer: referer_,
            },
          })
            .then(() => {
              console.log("load ts file success");
            })
            .catch((e) => {
              console.log("Force Faile");
            });
        });
    }

force_download_m3u8("https://xxx.77player.xyz/ioshls/1c4bd09daa7cb0420ac33ee28025c5c2/1c4bd09daa7cb0420ac33ee28025c5c2.m3u8", "https://xxx.77player.xyz/public/dist/inde_rbt.html?id=450532121a58d5453fae5992bfc5d6d6&b=9375154")