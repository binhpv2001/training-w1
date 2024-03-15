
 //todo : đặt url hay cái gì đó tương tự nghe hay hơn đấy
const host = 'https://jsonplaceholder.typicode.com'

//2
fetch( `${ host }/users` ).then( response => response.json() );

//3

const getData = async ( uri ) => {
  try {
    const response = await fetch( `${ host }/${ uri }`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    } );

    const data = await response.json();
    return data;
  } catch ( err ) {
    console.error( "Error with message ", err.message );
    throw err;
  }
}

const handleData = ( users, posts, comments ) => {
  const data = users.map( ( user ) => {
    const userPosts = posts.filter( ( post ) => post.userId === user.id ).map( post => ( {
      id: post.id,
      title: post.title,
      body: post.body
    } ) );
    const userComments = comments.filter( ( comment ) => {
      const post = posts.find( ( post ) => post.id === comment.postId );
      return post && post.userId === user.id;
    } ).map( comment => ( {
      // anh không nghĩ là cần map lại chỗ này đâu =)) cho return thằng cũng đc 
      id: comment.id,
      postId: comment.postId,
      name: comment.name,
      body: comment.body
    } ) );

    // todo : dùng rest operator
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      comments: userComments,
      posts: userPosts
    };
  } );

  return data;
}

const handleUserData = async () => {
  try {
    const [ users, posts, comments ] = await Promise.all( [
      getData( 'users' ), getData( 'posts' ), getData( 'comments' )
    ] );
    const result = handleData( users, posts, comments );
    return result;
  } catch ( error ) {
    console.log( error );
  }
}


//4
const filterUserMoreThan3Comments = async () => {
  const rawData = await handleUserData();
  const usersWithMoreThan3Comments = rawData.filter( user => user.comments.length > 3 );
  console.log( usersWithMoreThan3Comments );
}

//5
const countCommentAndPost = ( users ) => {
  return users.map( user => ( {
    // chỗ này cùng nên dùng rest operator
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    commentsCount: user.comments.length,
    postsCount: user.posts.length
  } ) );
};

const reformatUser = async () => {
  const rawData = await handleUserData();
  const results = countCommentAndPost( rawData );
  return results;
}

//6
const findMaxPostsCount = ( arr ) => {
  const postsCounts = arr.map( item => item.postsCount );
  return Math.max( ...postsCounts );
};

const findUserHasMostPost = async () => {
  const users = await reformatUser();
  const maxPost = findMaxPostsCount( users );
  const userHasMaxPost = users.filter( ( user ) => user.postsCount === maxPost );
  return userHasMaxPost;
}

//7
const sortUserByPostscount = async () => {
  users.sort( ( a, b ) => b.postsCount - a.postsCount );
  return users;
}

//8
const ex8 = async () => {
  try {
    const [ postResponse, commentsResponse ] = await Promise.all( [
      getData( 'posts/1' ), getData( 'comments?postId=1' )
    ] );
    postResponse.comments = commentsResponse;
    return postResponse;
  } catch ( error ) {
    console.log( 'Error with message: ', error.message );
  }
}
