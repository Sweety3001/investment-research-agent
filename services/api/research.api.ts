import {
  ApiResponse,
  InvestmentReport,
} from "@/types";

export class ResearchApi {
  static async analyze(
    company: string
  ): Promise<ApiResponse<InvestmentReport>> {

    try {
      const response = await fetch(
        "/api/v1/research",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            company,
          }),
        }
      );

      if (!response.ok) {

        const errorText =
          await response.text();

        let errorData;

        try {
          errorData =
            JSON.parse(errorText);
        } catch {
          errorData = {
            message:
              errorText ||
              "Internal Server Error",
          };
        }

        return {
          success: false,
          message:
            errorData.message ||
            "Failed to fetch research data.",
          error:
            errorData.error || {
              code: "SERVER_ERROR",
              details:
                "Backend crashed",
            },
        };
      }

      const result:
        ApiResponse<InvestmentReport> =
          await response.json();

      return result;

    } catch (error) {

      console.error(
        "ResearchApi error:",
        error
      );

      return {
        success: false,
        message:
          "Network error occurred.",
        error: {
          code: "FETCH_FAILED",
          details: String(error),
        },
      };
    }
  }
}