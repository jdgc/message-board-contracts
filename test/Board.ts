import { ethers } from "hardhat";
import { Signer, ContractFactory } from "ethers";
import { expect } from "chai";


describe("Board", function() {
  let accounts: Signer[];
  let Board: ContractFactory;

  before(async function() {
    accounts = await ethers.getSigners();
    Board = await ethers.getContractFactory("Board");
  });
  

  describe("createThread", function() {
    it("should create a thread", async function() {
      const board = await Board.deploy();
      expect(await board.getThreadCount()).to.equal(0);

      board.createThread("new post here");

      expect(await board.getThreadCount()).to.equal(1);
    })
  })

  describe("postInThread", function() {
    it("should create a post in the specified thread", async function() {
      const board = await Board.deploy();
      board.createThread("new post here");

      board.postInThread(0, "second post");
      const posts = await board.getPostsInThread(0);
      expect(posts.length).to.equal(2);
    });

    it("should raise error when specified thread does not exist (has zero posts)", async function() {
      const board = await Board.deploy();

      await expect(board.postInThread(0, "hello")).to.be.revertedWith("thread does not exist");
    });
  });

  describe("getPostsInThread", function() {
    it("should retrieve all of the posts in a specified thread", async function() {
      const board = await Board.deploy();
      board.createThread("first post");
      board.postInThread(0, "second post");
      board.postInThread(0, "third post");

      const posts = await board.getPostsInThread(0);
      expect(posts.length).to.equal(3);
    });

    it("should revert if the specified thread does not exist", async function() {
      const board = await Board.deploy();

      await expect(board.getPostsInThread(0)).to.be.revertedWith("empty thread");
    })
  });

  describe("getPostCount", function() {
    it("should return 0 when there are no posts", async function() {
      const board = await Board.deploy();

      expect(await board.getPostCount()).to.equal(0);
    });

    it("should return the number of posts that exist", async function() {
      const board = await Board.deploy();

      board.createThread("new post here");
      expect(await board.getPostCount()).to.equal(1);

      board.postInThread(0, "second post");
      expect(await board.getPostCount()).to.equal(2);
    })
  });

  describe("getThreadCount", function() {
     it("should return 0 when there are no threads", async function() {
      const board = await Board.deploy();

      expect(await board.getThreadCount()).to.equal(0);
    });

    it("should return the number of threads that exist", async function() {
      const board = await Board.deploy();

      board.createThread("new post here");
      expect(await board.getThreadCount()).to.equal(1);

      board.postInThread(0, "second post")
      expect(await board.getThreadCount()).to.equal(1);
    })
  })

  describe("postCountOf", function() {
    it("should list the number of posts for a given thread id", async function() {
      const board = await Board.deploy();
      board.createThread("new post here");
      board.postInThread(0, "second post")

      expect(await board.postCountOf(0)).to.equal(2);
    })

    it("should return zero if the thread is empty or does not exist", async function() {
      const board = await Board.deploy();

      expect(await board.postCountOf(0)).to.equal(0);
    })
  })

});
