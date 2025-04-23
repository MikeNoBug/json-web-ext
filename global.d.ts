declare global {
  interface OpenWindowRequest {
    type: "openWindow";
    data: {
      url: string;
      width: number;
      height: number;
    };
  }

  type MessageRquest = OpenWindowRequest;
}
export {};
