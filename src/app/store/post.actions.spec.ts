import * as PostActions from './post.actions';

describe('Post Actions', () => {
  it('should create loadPostsSuccess action with posts', () => {
    const mockPosts = [
      { userId: 1, id: 1, title: 'Post 1', body: 'Content for post 1' }
    ];
    const action = PostActions.loadPostsSuccess({ posts: mockPosts });

    expect(action.type).toBe('[Post] Load Posts Success');
    expect(action.posts).toEqual(mockPosts);
  });

  it('should create selectPost action with postId', () => {
    const postId = 1;
    const action = PostActions.selectPost({ postId });

    expect(action.type).toBe('[Post] Select Post');
    expect(action.postId).toBe(postId);
  });
});
