import { ethers } from "hardhat";
import { Contract, ContractFactory } from "ethers";
import { expect } from "chai";


describe("Board", function() {
  let Board: ContractFactory;
  let board: Contract;

  beforeEach(async function() {
    Board = await ethers.getContractFactory("Board");
    board = await Board.deploy();
  });
  
  describe("createThread", function() {
    it("should create a thread", async function() {
      expect(await board.getThreadCount()).to.equal(0);

      board.createThread("new post here");

      expect(await board.getThreadCount()).to.equal(1);
    })

    it("should emit NewThread event", async function() {
      await expect(board.createThread("new post here")).to.emit(board, "NewThread");
    })
  })

  describe("postInThread", function() {
    it("should create a post in the specified thread", async function() {
      board.createThread("new post here");
      board.postInThread(0, "second post");

      const posts = await board.getPostsInThread(0);
      expect(posts.length).to.equal(2);
    });

    it("should raise error when specified thread does not exist (has zero posts)", async function() {
      await expect(board.postInThread(0, "hello")).to.be.revertedWith("thread does not exist");
    });

    it("should emit NewPost event", async function() {
      board.createThread("new post here");

      await expect(board.postInThread(0, "post")).to.emit(board, "NewPost");
    })
  });

  describe("getPostsInThread", function() {
    it("should retrieve all of the posts in a specified thread", async function() {
      board.createThread("first post");
      board.postInThread(0, "second post");
      board.postInThread(0, "third post");

      let posts = await board.getPostsInThread(0);

      expect(posts.length).to.equal(3);
      expect(posts[0].content).to.equal("first post");
      expect(posts[1].content).to.equal("second post");
      expect(posts[2].content).to.equal("third post");

      board.createThread("second thread");
      board.postInThread(1, "second thread, second post");

      posts = await board.getPostsInThread(1);

      expect(posts.length).to.equal(2);
      expect(posts[0].content).to.equal("second thread");
      expect(posts[1].content).to.equal("second thread, second post");
    });

    it("should revert if the specified thread does not exist", async function() {
      await expect(board.getPostsInThread(0)).to.be.revertedWith("empty thread");
    })
  });

  describe("getPostCount", function() {
    it("should return 0 when there are no posts", async function() {
      expect(await board.getPostCount()).to.equal(0);
    });

    it("should return the number of posts that exist", async function() {
      board.createThread("new post here");
      expect(await board.getPostCount()).to.equal(1);

      board.postInThread(0, "second post");
      expect(await board.getPostCount()).to.equal(2);
    })
  });

  describe("getThreadCount", function() {
     it("should return 0 when there are no threads", async function() {
      expect(await board.getThreadCount()).to.equal(0);
    });

    it("should return the number of threads that exist", async function() {
      board.createThread("new post here");
      expect(await board.getThreadCount()).to.equal(1);

      board.postInThread(0, "second post")
      expect(await board.getThreadCount()).to.equal(1);
    })
  })

  describe("postCountOf", function() {
    it("should list the number of posts for a given thread id", async function() {
      board.createThread("new post here");
      board.postInThread(0, "second post")

      expect(await board.postCountOf(0)).to.equal(2);
    })

    it("should return zero if the thread is empty or does not exist", async function() {
      expect(await board.postCountOf(0)).to.equal(0);
    })
  })
});
