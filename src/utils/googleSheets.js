export async function guardarEnGoogleSheets(hoja, valores, juez) {
  try {
    const response = await fetch(import.meta.env.VITE_SHEETS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        spreadsheetId: import.meta.env.VITE_SHEET_ID,
        sheetName: hoja,
        values: valores,
        juez: juez,
      }),
    });

    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error guardando en Google Sheets:", error);
    throw error;
  }
}
