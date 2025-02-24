import { formatDateFromNow } from "@/utils/date";
import { Timestamp } from "firebase/firestore";

describe("Date utility functions", () => {
  const mockDate = new Date("2024-03-20T10:00:00Z");

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe("formatDateFromNow", () => {
    it("should correctly format a relative Timestamp", () => {
      const timestamp = Timestamp.fromDate(mockDate);
      expect(formatDateFromNow(timestamp)).toBe("3/20/2024");
    });

    it("should handle null values", () => {
      expect(formatDateFromNow(null)).toBeUndefined();
    });
  });
});
