import {
  faGear,
  faHeart,
  faPlus,
  faThumbsUp,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
  faNewspaper,
  IconDefinition,
} from '@fortawesome/free-regular-svg-icons';

export const SidebarLinks: {
  groupName: string;
  links: { url: string; name: string; icon: IconDefinition }[];
}[] = [
  {
    groupName: 'Posts',
    links: [
      { url: '/user/posts', name: 'My posts', icon: faNewspaper },
      { url: '/user/addNewPost', name: 'New post', icon: faPlus },
      { url: '/user/likedPosts', name: 'Liked posts', icon: faThumbsUp },
      { url: '/user/followPosts', name: 'Follow posts', icon: faHeart },
    ],
  },
  {
    groupName: 'Account',
    links: [
      { url: '/user/account', name: 'My account', icon: faUser },
      { url: '/user/settings', name: 'Settings', icon: faGear },
    ],
  },
];
