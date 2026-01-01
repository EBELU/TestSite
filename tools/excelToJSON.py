import pandas as pd
import json

df = pd.read_excel("tools/dataSheet.xlsx")
df["invasiv"] = df["invasiv"].astype(bool)

# Convert to list of dictionaries
data = df.to_dict(orient="records")

# Save as JSON
with open("plants.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

