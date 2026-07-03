import app from "./app";
import { seed } from "./seed";

const PORT = parseInt(process.env.PORT || "3001", 10);

seed().then(() => {
  app.listen(PORT, () => {
    console.log(`Colors Auto Traders API running on http://localhost:${PORT}`);
    if (process.env.NODE_ENV !== "production") {
      console.log(`Dev mode — frontend at http://localhost:5173`);
    }
  });
});
