export async function fetchEvaluation(userAnswer: string, aiAnswer: string) {
  const response = await fetch("/api/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userAnswer, aiAnswer }),
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let result = "";

  if (reader) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value, { stream: true });
    }
  }

  console.log("Strumieniowa odpowiedź:", result);
  return result;
}
