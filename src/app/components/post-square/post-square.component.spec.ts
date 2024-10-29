import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PostSquareComponent } from './post-square.component';
import { selectPost } from '../../store/post.actions';
import { Post } from '../../models/post.model';
import { selectSelectedPostId } from '../../store/post.selector';

describe('PostSquareComponent', () => {
  let component: PostSquareComponent;
  let fixture: ComponentFixture<PostSquareComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  const mockPost: Post = {
    userId: 1,
    id: 1,
    title: 'Test Title',
    body: 'Test Body',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostSquareComponent],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectSelectedPostId, value: null }],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PostSquareComponent);
    component = fixture.componentInstance;
    component.post = mockPost;
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select the post and change display to userId on first click', fakeAsync(() => {
    component.onClick();
    tick();
    fixture.detectChanges();

    expect(component.displayProperty).toBe('userId');
    expect(dispatchSpy).toHaveBeenCalledWith(selectPost({ postId: mockPost.id }));
  }));

  it('should rotate through properties on subsequent clicks', fakeAsync(() => {
    component.selectedPostId = mockPost.id;
    fixture.detectChanges();

    component.onClick();
    tick();
    fixture.detectChanges();
    expect(component.displayProperty).toBe('userId');

    component.onClick();
    tick();
    fixture.detectChanges();
    expect(component.displayProperty).toBe('id');

    component.onClick();
    tick();
    fixture.detectChanges();
    expect(component.displayProperty).toBe('body');

    component.onClick();
    tick();
    fixture.detectChanges();
    expect(component.displayProperty).toBe('title');
  }));

  it('should reset display property to title when deselected', fakeAsync(() => {
    component.selectedPostId = mockPost.id;
    component.onClick();
    tick();
    fixture.detectChanges();
    expect(component.displayProperty).toBe('userId');

    component.selectedPostId = null;
    component.updateDisplayProperty();
    tick();
    fixture.detectChanges();

    expect(component.displayProperty).toBe('title');
  }));
});
