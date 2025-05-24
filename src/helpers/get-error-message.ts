export function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null) {
    if (
      "response" in error &&
      typeof (error as any).response?.data?.message === "string"
    ) {
      return (error as any).response.data.message;
    }
    if ("message" in error && typeof (error as any).message === "string") {
      return (error as any).message;
    }
  }
  return "Ocorreu um erro inesperado. Tente novamente mais tarde.";
}
