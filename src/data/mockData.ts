import { Track, Playlist, Album } from '../types';

export const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'Pop',
    year: 2020,
    popularity: 95
  },
  {
    id: '2',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    duration: 174,
    imageUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'Pop',
    year: 2020,
    popularity: 88
  },
  {
    id: '3',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: 178,
    imageUrl: 'https://images.pexels.com/photos/1876279/pexels-photo-1876279.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'Pop Rock',
    year: 2021,
    popularity: 92
  },
  {
    id: '4',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: 203,
    imageUrl: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'Disco Pop',
    year: 2020,
    popularity: 90
  },
  {
    id: '5',
    title: 'Anti-Hero',
    artist: 'Taylor Swift',
    album: 'Midnights',
    duration: 200,
    imageUrl: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'Pop',
    year: 2022,
    popularity: 96
  },
  {
    id: '6',
    title: 'As It Was',
    artist: 'Harry Styles',
    album: 'Harry\'s House',
    duration: 167,
    imageUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'Pop Rock',
    year: 2022,
    popularity: 94
  },
  {
    id: '7',
    title: 'Unholy',
    artist: 'Sam Smith ft. Kim Petras',
    album: 'Gloria',
    duration: 156,
    imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'Pop',
    year: 2022,
    popularity: 89
  },
  {
    id: '8',
    title: 'Flowers',
    artist: 'Miley Cyrus',
    album: 'Endless Summer Vacation',
    duration: 200,
    imageUrl: 'https://images.pexels.com/photos/931153/pexels-photo-931153.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'Pop Rock',
    year: 2023,
    popularity: 91
  }
];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Today\'s Top Hits',
    description: 'The most played songs right now',
    imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
    tracks: mockTracks.slice(0, 5),
    owner: 'Spotify',
    isPublic: true,
    createdAt: '2024-01-01',
    totalDuration: mockTracks.slice(0, 5).reduce((acc, track) => acc + track.duration, 0)
  },
  {
    id: '2',
    name: 'Chill Hits',
    description: 'Kick back to the best new and recent chill hits',
    imageUrl: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
    tracks: mockTracks.slice(2, 7),
    owner: 'Spotify',
    isPublic: true,
    createdAt: '2024-01-01',
    totalDuration: mockTracks.slice(2, 7).reduce((acc, track) => acc + track.duration, 0)
  },
  {
    id: '3',
    name: 'My Favorites',
    description: 'Your personal collection of favorite tracks',
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
    tracks: [mockTracks[0], mockTracks[2], mockTracks[4]],
    owner: 'You',
    isPublic: false,
    createdAt: '2024-01-15',
    totalDuration: [mockTracks[0], mockTracks[2], mockTracks[4]].reduce((acc, track) => acc + track.duration, 0)
  }
];

export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'After Hours',
    artist: 'The Weeknd',
    year: 2020,
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
    tracks: [mockTracks[0]],
    genre: 'Pop',
    totalDuration: mockTracks[0].duration
  },
  {
    id: '2',
    title: 'Fine Line',
    artist: 'Harry Styles',
    year: 2020,
    imageUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300',
    tracks: [mockTracks[1]],
    genre: 'Pop Rock',
    totalDuration: mockTracks[1].duration
  },
  {
    id: '3',
    title: 'SOUR',
    artist: 'Olivia Rodrigo',
    year: 2021,
    imageUrl: 'https://images.pexels.com/photos/1876279/pexels-photo-1876279.jpeg?auto=compress&cs=tinysrgb&w=300',
    tracks: [mockTracks[2]],
    genre: 'Pop Rock',
    totalDuration: mockTracks[2].duration
  }
];

export const genres = [
  'Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical', 
  'Country', 'R&B', 'Indie', 'Alternative', 'Folk', 'Reggae'
];