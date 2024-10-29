import { PostState } from './post.reducer';
import { selectAllPosts, selectSelectedPostId } from './post.selector';

fdescribe('Post Selectors', () => {
  const mockPosts = [
    { userId: 1, id: 1, title: 'Post 1', body: 'Content for post 1' },
    { userId: 2, id: 2, title: 'Post 2', body: 'Content for post 2' }
  ];

  const initialState: PostState = {
    posts: mockPosts,
    selectedPostId: 1,
    error: undefined
  };

  it('should select all posts', () => {
    const result = selectAllPosts.projector(initialState);
    expect(result).toEqual(mockPosts);
  });

  it('should select the selected post ID', () => {
    const result = selectSelectedPostId.projector(initialState);
    expect(result).toBe(1);
  });
});
