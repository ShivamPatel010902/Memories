export const categories = [
    {
      name: 'semester-1',
      image: 'https://aksharaimt.com/images/semester1.png',
    },
    {
      name: 'semester-2',
      image: 'https://aksharaimt.com/images/semester2.png',
    },
    {
      name: 'semester-3',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmWH7u1z6zXoiibSyODJN1aQp5D3wTryq-xnC0ZHtRxhz7eNLySwNkzDUx8JaOvT3BWZY&usqp=CAU',
    },
    {
      name: 'semester-4',
      image: 'https://civilexpresso.files.wordpress.com/2017/02/semester4-web.png',
    },
    {
      name: 'semester-5',
      image: 'https://d31ezp3r8jwmks.cloudfront.net/Th4XsFxwod5MmVyHAunttUfu',
    },
    {
      name: 'semester-6',
      image: 'https://1.bp.blogspot.com/-WT1Oc0ysyX4/XdjZnsSUUZI/AAAAAAAAewo/qH-t1-dPgq0fh_Yvt9xLXudlEK-23ll8wCLcBGAsYHQ/s1600/PicsArt_11-23-12.28.09.jpg',
    },
    {
      name: 'semester-7',
      image: 'https://lpmalaysia.com.my/img/c/58-tm_category_default.jpg',
    },
    {
      name: 'semester-8',
      image: 'https://cdn.dribbble.com/users/5766259/screenshots/14181552/shot-cropped-1599814953349.png',
    },
    {
      name: 'other',
      image: 'https://i1.sndcdn.com/avatars-000330114611-hkocch-t500x500.jpg',
    },
  ];
  
  export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        },
      } `;
  
  export const pinDetailQuery = (pinId) => {
    const query = `*[_type == "pin" && _id == '${pinId}']{
      image{
        asset->{
          url
        }
      },
      _id,
      title, 
      about,
      category,
      postedBy->{
        _id,
        userName,
        image
      },
     save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      }
    }`;
    return query;
  };
  
  export const pinDetailMorePinQuery = (pin) => {
    const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
      image{
        asset->{
          url
        }
      },
      _id,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
  };
  
  export const searchQuery = (searchTerm) => {
    const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
          image{
            asset->{
              url
            }
          },
              _id,
              postedBy->{
                _id,
                userName,
                image
              },
              save[]{
                _key,
                postedBy->{
                  _id,
                  userName,
                  image
                },
              },
            }`;
    return query;
  };

  export const validuserQuery = (userId) => {
    const query = `*[_type == "validuser" && userId == '${userId}']`;
    return query;
  };

  
  export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']`;
    return query;
  };

  export const userCreatedPinsQuery = (userId) => {
    const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
      image{
        asset->{
          url
        }
      },
      _id,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
  };
  
  export const userSavedPinsQuery = (userId) => {
    const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
};