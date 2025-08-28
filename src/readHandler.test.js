import { equal } from "assert";
import { readHandler } from "./readHandler";
import fs from "fs/promises";

const createMockResponse = (testCtx) => ({
  writeHead: testCtx.mock.fn(),
  setHeader: testCtx.mock.fn(),
  write: testCtx.mock.fn(),
  end: testCtx.mock.fn(),
});

test("readHandler tests", async (testCtx) => {
  const data = "json-data";
  testCtx.mock.method(fs, "readFile", async () => data);
  //   const req = {};
  //   const resp = {
  //     setHeader: testCtx.mock.fn(),
  //     write: testCtx.mock.fn(),
  //     end: testCtx.mock.fn(),
  //   };
  await readHandler(req, resp);

  //Test the successful outcome
  await testCtx.test("Successfully reads file", async (innerCtx) => {
    //Arrange: mock readFile to SUCCEED
    innerCtx.mock.method(fs, "readFile", async () => "json-data");
    const resp = createMockResponse(innerCtx);
    //Act
    await readHandler(req, resp);
    //Assert
    equal(resp.setHeader.mock.calls[0].arguments[0], "Content-Type");
    equal(resp.setHeader.mock.calls[0].arguments[1], "application/json");
    equal(resp.write.mock.calls[0].arguments[0], data);
    equal(resp.write.mock.callCount(), 1);
  });

  // Test the failure outcome

  await testCtx.test("Handles error reading file", async (innerCtx) => {
    //Arange:set up the test
    innerCtx.mock.method(fs, "readFile", () => Promise.reject("file error"));
    const resp = createMockResponse(innerCtx);
    //Act-Perform the test
    await readHandler(req, resp);

    //Assert-verfiy the results
    equal(resp.writeHead.mock.calls[0].arguments[0], 500);
    equal(resp.end.mock.callCount(), 1);
  });

  //Asset verfiy the results

  equal(resp.setHeader.mock.calls[0].arguments[0], "Content-Type");
  equal(resp.setHeader.mock.calls[0].arguments[1], "application/json");
  equal(resp.write.mock.calls[0].arguments[0], data);
  equal(resp.end.mock.callCount(), 1);
});
