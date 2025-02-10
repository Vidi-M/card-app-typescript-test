import { Entry } from "@prisma/client";
import Prisma from "../src/db";
import { server } from "../src/server";

jest.mock("../src/db", () => ({
  entry: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("server test", () => {
  it("should assert 1 + 1 is 2", () => {
    expect(1 + 1).toEqual(2);
  });
});

const mockCard: Entry = {
  id: "123",
  title: "test",
  description: "description",
  created_at: new Date(),
  due_for: new Date(),
};

const noDueDateMockCard: Entry = {
  id: "456",
  title: "test",
  description: "description",
  created_at: new Date(),
  due_for: null,
};

describe("Test: Create", () => {
  it("should create a sucessful card", async () => {
    (Prisma.entry.create as jest.Mock).mockResolvedValue(mockCard);

    const resp = await server.inject({
      method: "POST",
      url: "/create/",
      payload: mockCard,
    });

    const body: Entry = JSON.parse(resp.body);
    body.created_at = new Date(body.created_at);
    body.due_for = body.due_for ? new Date(body.due_for) : null;
    expect(resp.statusCode).toBe(200);
    expect(body).toEqual(mockCard);
  });

  it("should create a sucessful card without a date", async () => {
    (Prisma.entry.create as jest.Mock).mockResolvedValue(noDueDateMockCard);

    const resp = await server.inject({
      method: "POST",
      url: "/create/",
      payload: noDueDateMockCard,
    });

    const body: Entry = JSON.parse(resp.body);
    body.created_at = new Date(body.created_at);
    body.due_for = body.due_for ? new Date(body.due_for) : null;
    expect(resp.statusCode).toBe(200);
    expect(body).toEqual(noDueDateMockCard);
  });
});

describe("Test: Retrieve", () => {
  it("should return a list of all the cards in the database", async () => {
    const cards = [mockCard, noDueDateMockCard];
    (Prisma.entry.findMany as jest.Mock).mockResolvedValue(cards);

    const response = await server.inject({
      method: "GET",
      url: "/get/",
    });

    const tempBodies: Entry[] = JSON.parse(response.body);

    const bodies: Entry[] = tempBodies.map((body) => ({
      ...body,
      created_at: new Date(body.created_at),
      due_for: body.due_for ? new Date(body.due_for) : null,
    }));

    expect(bodies).toEqual(cards);
  });

  it("should return a specific card id from the database", async () => {
    (Prisma.entry.findUnique as jest.Mock).mockResolvedValue(mockCard);

    const response = await server.inject({
      method: "GET",
      url: `/get/${mockCard.id}`,
    });

    const body: Entry = JSON.parse(response.body);
    body.created_at = new Date(body.created_at);
    body.due_for = body.due_for ? new Date(body.due_for) : null;

    expect(response.statusCode).toBe(200);
    expect(body).toEqual(mockCard);
  });

  it("should return empty array if there are no cards in database", async () => {
    // used same code as return all cards for certainity
    (Prisma.entry.findMany as jest.Mock).mockResolvedValue([]);

    const response = await server.inject({
      method: "GET",
      url: "/get/",
    });

    const tempBodies: Entry[] = JSON.parse(response.body);

    const bodies: Entry[] = tempBodies.map((body) => ({
      ...body,
      created_at: new Date(body.created_at),
      due_for: body.due_for ? new Date(body.due_for) : null,
    }));

    expect(bodies).toEqual([]);
  });
});

describe("Test: Update (general)", () => {
  it("should update the title of the card", async () => {
    const updatedCard: Entry = { ...mockCard, title: "new title" };

    const request = await server.inject({
      method: "PUT",
      url: `/update/${mockCard.id}`,
      payload: updatedCard,
    });

    updatedCard.created_at = new Date(updatedCard.created_at);
    updatedCard.due_for = updatedCard.due_for ? new Date(updatedCard.due_for) : null;

    expect(request.statusCode).toEqual(200);
    expect(Prisma.entry.update).toHaveBeenCalledWith({
      where: { id: mockCard.id }, // to ensure the original card it being updated
      data: updatedCard,
    });
  });

  it("should update the description of the card", async () => {
    const updatedCard: Entry = { ...mockCard, description: "new description" };

    const request = await server.inject({
      method: "PUT",
      url: `/update/${mockCard.id}`,
      payload: updatedCard,
    });

    updatedCard.created_at = new Date(updatedCard.created_at);
    updatedCard.due_for = updatedCard.due_for ? new Date(updatedCard.due_for) : null;

    expect(request.statusCode).toEqual(200);
    expect(Prisma.entry.update).toHaveBeenCalledWith({
      where: { id: mockCard.id }, // to ensure the original card it being updated
      data: updatedCard,
    });
  });

  it("should update the created_at date of the card", async () => {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const updatedCard: Entry = { ...mockCard, created_at: yesterday };

    const request = await server.inject({
      method: "PUT",
      url: `/update/${mockCard.id}`,
      payload: updatedCard,
    });

    const body: Entry = { ...updatedCard };
    body.created_at = new Date(body.created_at);
    body.due_for = body.due_for ? new Date(body.due_for) : null;

    expect(request.statusCode).toEqual(200);
    expect(Prisma.entry.update).toHaveBeenCalledWith({
      where: { id: mockCard.id }, // to ensure the original card it being updated
      data: body,
    });
  });
});

describe("Test: Update (due date)", () => {
  it("should update the due date of the card", async () => {
    var nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);

    const updatedCard: Entry = { ...mockCard, due_for: nextDay };

    const request = await server.inject({
      method: "PUT",
      url: `/update/${mockCard.id}`,
      payload: updatedCard,
    });

    const body: Entry = { ...updatedCard };
    body.created_at = new Date(body.created_at);
    body.due_for = body.due_for ? new Date(body.due_for) : null;

    expect(request.statusCode).toEqual(200);
    expect(Prisma.entry.update).toHaveBeenCalledWith({
      where: { id: mockCard.id }, // to ensure the original card it being updated
      data: body,
    });
  });

  it("should update the due date with null", async () => {
    const updatedCard: Entry = { ...mockCard, due_for: null };

    const request = await server.inject({
      method: "PUT",
      url: `/update/${mockCard.id}`,
      payload: updatedCard,
    });

    const body: Entry = { ...updatedCard };
    body.created_at = new Date(body.created_at);
    body.due_for = body.due_for ? new Date(body.due_for) : null;

    expect(request.statusCode).toEqual(200);
    expect(Prisma.entry.update).toHaveBeenCalledWith({
      where: { id: mockCard.id }, // to ensure the original card it being updated
      data: body,
    });
  });

  it("should update null with due date", async () => {
    var nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);

    const updatedCard: Entry = { ...noDueDateMockCard, due_for: nextDay };

    const request = await server.inject({
      method: "PUT",
      url: `/update/${noDueDateMockCard.id}`,
      payload: updatedCard,
    });

    const body: Entry = { ...updatedCard };
    body.created_at = new Date(body.created_at);
    body.due_for = body.due_for ? new Date(body.due_for) : null;

    expect(request.statusCode).toEqual(200);
    expect(Prisma.entry.update).toHaveBeenCalledWith({
      where: { id: noDueDateMockCard.id }, // to ensure the original card it being updated
      data: body,
    });
  });
});

describe("Test: Delete", () => {
  it("should delete a specific card from db", async () => {
    const request = await server.inject({
      method: "DELETE",
      url: `/delete/${mockCard.id}`,
    });

    expect(request.statusCode).toEqual(200);
    expect(Prisma.entry.delete).toHaveBeenCalledWith({
      where: { id: mockCard.id },
    });
  });
});

describe("Test: Error handling", () => {
  const invalidID = "999";

  it("should return the correct error message when create was unsucessful", async () => {
    (Prisma.entry.create as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: mockCard,
    });

    expect(response.statusCode).toBe(500);
    expect(response.body.toString()).toContain("Error creating entry");
  });

  it("should return the correct error message when retrival was unsucessful", async () => {
    (Prisma.entry.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await server.inject({
      method: "GET",
      url: `/get/${invalidID}`,
    });

    expect(response.statusCode).toBe(500);
    expect(response.body).toContain(`Error finding entry with id ${invalidID}`);
  });

  it("should return the correct error message when update was unsucessful", async () => {
    const updatedCard: Entry = { ...mockCard, description: "new description" };

    (Prisma.entry.update as jest.Mock).mockRejectedValueOnce(new Error("error"));

    const response = await server.inject({
      method: "PUT",
      url: `/update/${mockCard.id}`,
      payload: updatedCard,
    });

    expect(response.statusCode).toBe(500);
    expect(response.body).toContain("Error updating");
  });

  it("should return the correct error message when delete was unsucessful", async () => {
    (Prisma.entry.delete as jest.Mock).mockRejectedValueOnce(new Error("error"));

    const response = await server.inject({
      method: "DELETE",
      url: `/delete/${invalidID}`,
    });

    expect(response.statusCode).toBe(500);
    expect(response.body).toContain("Error deleting entry");
  });
});
