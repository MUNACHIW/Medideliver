"use client"
import { useState } from "react";
import {
    HeartIcon,
    ChatBubbleLeftIcon,
    PaperAirplaneIcon,
    UserCircleIcon,
    ShareIcon,
    BookmarkIcon,
    EllipsisHorizontalIcon,
    PlusIcon,
    SparklesIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid, BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";

export default function EnhancedHealthcarePostsFeed() {
    const [posts, setPosts] = useState([
        {
            id: 1,
            author: {
                name: "Dr. Sarah Johnson",
                role: "Cardiac Surgeon",
                avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
                verified: true
            },
            content: "Just completed a successful cardiac surgery using the new minimally invasive technique. Patient is recovering wonderfully and will be home by the weekend! The innovation in medical technology continues to amaze me. 🏥❤️",
            timestamp: "2 hours ago",
            likes: 142,
            comments: 28,
            shares: 5,
            isLiked: false,
            isBookmarked: false,
            tags: ["surgery", "innovation"],
            image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=300&fit=crop"
        },
        {
            id: 2,
            author: {
                name: "Nurse Emily Rodriguez",
                role: "ICU Nurse",
                avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
                verified: true
            },
            content: "Night shift reflections: Witnessed three families reunite with their loved ones today. These moments remind me why I chose healthcare. The resilience of the human spirit never ceases to inspire me. 🌙✨💙",
            timestamp: "5 hours ago",
            likes: 89,
            comments: 15,
            shares: 12,
            isLiked: true,
            isBookmarked: true,
            tags: ["inspiration", "night-shift"]
        },
        {
            id: 3,
            author: {
                name: "Alex Chen",
                role: "Medical Courier",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
                verified: false
            },
            content: "Emergency delivery complete! Rushed critical blood samples from the rural clinic to the main hospital lab. 45-minute drive completed in 30 minutes safely. Every second counts when lives are on the line! 📦⚡🚨",
            timestamp: "1 day ago",
            likes: 67,
            comments: 8,
            shares: 3,
            isLiked: false,
            isBookmarked: false,
            tags: ["emergency", "courier"]
        }
    ]);

    const [newPost, setNewPost] = useState("");
    const [isPosting, setIsPosting] = useState(false);

    const handleCreatePost = async () => {
        if (!newPost.trim()) return;

        setIsPosting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const post = {
            id: Date.now(),
            author: {
                name: "You",
                role: "Healthcare Professional",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                verified: false
            },
            content: newPost,
            timestamp: "Just now",
            likes: 0,
            comments: 0,
            shares: 0,
            isLiked: false,
            isBookmarked: false,
            tags: []
        };

        setPosts([post, ...posts]);
        setNewPost("");
        setIsPosting(false);
    };

    const toggleLike = (postId) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    isLiked: !post.isLiked,
                    likes: post.isLiked ? post.likes - 1 : post.likes + 1
                };
            }
            return post;
        }));
    };

    const toggleBookmark = (postId) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    isBookmarked: !post.isBookmarked
                };
            }
            return post;
        }));
    };

    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Enhanced Header */}
            <div className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-blue-100">
                <div className="max-w-3xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                                <SparklesIcon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    HealthConnect
                                </h1>
                                <p className="text-gray-600 text-sm">Professional healthcare community</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                {posts.length} Posts
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Enhanced Create Post */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 mb-8 border border-white/20">
                    <div className="flex space-x-4">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                                alt="You"
                                className="w-14 h-14 rounded-full ring-4 ring-blue-100"
                            />
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1">
                            <textarea
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                placeholder="Share your healthcare experience, insight, or achievement..."
                                className="w-full p-4 border-2 border-gray-100 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-gray-50/50"
                                rows={4}
                                maxLength={500}
                            />
                            <div className="flex justify-between items-center mt-4">
                                <div className="flex items-center space-x-4">
                                    <span className={`text-sm font-medium ${newPost.length > 450 ? 'text-red-500' : 'text-gray-500'}`}>
                                        {newPost.length}/500
                                    </span>
                                    <div className="flex space-x-2">
                                        <button className="p-2 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
                                            <PlusIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCreatePost}
                                    disabled={!newPost.trim() || isPosting}
                                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                                >
                                    {isPosting ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <PaperAirplaneIcon className="w-4 h-4" />
                                    )}
                                    <span className="font-medium">{isPosting ? 'Posting...' : 'Share'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Posts */}
                <div className="space-y-8">
                    {posts.map((post, index) => (
                        <div key={post.id} className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20">
                            {/* Post Header */}
                            <div className="flex items-center justify-between p-6 pb-4">
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <img
                                            src={post.author.avatar}
                                            alt={post.author.name}
                                            className="w-14 h-14 rounded-full ring-4 ring-blue-100"
                                        />
                                        {post.author.verified && (
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <h3 className="font-bold text-gray-900">{post.author.name}</h3>
                                            {post.author.verified && (
                                                <span className="text-blue-500">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 font-medium">{post.author.role}</p>
                                        <p className="text-xs text-gray-500">{post.timestamp}</p>
                                    </div>
                                </div>
                                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100">
                                    <EllipsisHorizontalIcon className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Post Content */}
                            <div className="px-6 pb-4">
                                <p className="text-gray-800 leading-relaxed text-lg">
                                    {post.content}
                                </p>
                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {post.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Post Image */}
                            {post.image && (
                                <div className="px-6 pb-4">
                                    <img
                                        src={post.image}
                                        alt="Post content"
                                        className="w-full h-64 object-cover rounded-2xl"
                                    />
                                </div>
                            )}

                            {/* Enhanced Post Actions */}
                            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-6">
                                        <button
                                            onClick={() => toggleLike(post.id)}
                                            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all transform hover:scale-105 ${post.isLiked
                                                    ? 'text-red-500 bg-red-50 hover:bg-red-100'
                                                    : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                                                }`}
                                        >
                                            {post.isLiked ? (
                                                <HeartSolid className="w-5 h-5" />
                                            ) : (
                                                <HeartIcon className="w-5 h-5" />
                                            )}
                                            <span className="font-medium">{formatNumber(post.likes)}</span>
                                        </button>

                                        <button className="flex items-center space-x-2 px-4 py-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all transform hover:scale-105">
                                            <ChatBubbleLeftIcon className="w-5 h-5" />
                                            <span className="font-medium">{post.comments}</span>
                                        </button>

                                        <button className="flex items-center space-x-2 px-4 py-2 text-gray-500 hover:text-green-500 hover:bg-green-50 rounded-xl transition-all transform hover:scale-105">
                                            <ShareIcon className="w-5 h-5" />
                                            <span className="font-medium">{post.shares}</span>
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => toggleBookmark(post.id)}
                                        className={`p-2 rounded-xl transition-all transform hover:scale-105 ${post.isBookmarked
                                                ? 'text-yellow-500 bg-yellow-50'
                                                : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                                            }`}
                                    >
                                        {post.isBookmarked ? (
                                            <BookmarkSolid className="w-5 h-5" />
                                        ) : (
                                            <BookmarkIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Enhanced Empty State */}
                {posts.length === 0 && (
                    <div className="text-center py-16">
                        <div className="relative mb-8">
                            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mx-auto flex items-center justify-center">
                                <UserCircleIcon className="w-12 h-12 text-blue-400" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                                <SparklesIcon className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">No posts yet</h3>
                        <p className="text-gray-500 text-lg mb-6 max-w-md mx-auto">
                            Be the first to share your healthcare journey and inspire others in the community!
                        </p>
                        <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg">
                            Create Your First Post
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}