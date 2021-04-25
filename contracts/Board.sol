// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

contract Board {
    struct Post {
        uint256 id;
        uint256 threadId;
        address author;
        string content;
        uint256 createdAt;
    }

    mapping(uint256 => Post[]) public threads;
    mapping(uint256 => Post) public posts;

    uint256 private nextThreadId;
    uint256 private nextPostId;

    event NewThread(
        uint256 id,
        Post originalPost
    );

    event NewPost(
        Post post 
    );

    function createThread(string calldata _originalPostContent) external {
        posts[nextPostId] = Post(
            nextPostId,
            nextThreadId,
            msg.sender,
            _originalPostContent,
            block.timestamp
        );
        threads[nextThreadId].push(posts[nextPostId]);

        emit NewThread(nextThreadId, posts[nextPostId]);

        nextPostId++;
        nextThreadId++;
    }

    function postInThread(uint256 threadId, string calldata _content) external {
        require(threads[threadId].length > 0, "thread does not exist");

        posts[nextPostId] = Post(
            nextPostId,
            threadId,
            msg.sender,
            _content,
            block.timestamp
        );
        threads[threadId].push(posts[nextPostId]);

        emit NewPost(posts[nextPostId]);

        nextPostId++;
    }

    function getPostsInThread(uint256 threadId)
        external
        view
        returns (Post[] memory)
    {
        uint256 threadLength = threads[threadId].length;
        require(threadLength > 0, "empty thread");

        Post[] memory _posts = new Post[](threadLength);
        for (uint256 i = 0; i < threadLength; i++) {
            Post storage _post = threads[threadId][i];
            _posts[i] = Post(
                _post.id,
                _post.threadId,
                _post.author,
                _post.content,
                _post.createdAt
            );
        }
        return _posts;
    }

    function getPostCount() external view returns (uint256) {
        return nextPostId;
    }

    function getThreadCount() external view returns (uint256) {
        return nextThreadId;
    }

    function postCountOf(uint256 threadId) external view returns(uint256) {
        return threads[threadId].length;
    }
}
