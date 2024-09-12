from fastapi import FastAPI, Request
import httpx
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

@app.post("/")
async def forward_request(request: Request):
    body = await request.json()
    url = body.get('url')
    headers = body.get('headers', {})
    if not url:
        return {"error": "URL is missing from the request body"}

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, headers=headers)
            return {"ok": response.status_code == 200, "content": response.text}
        except httpx.RequestError as e:
            return {"ok": False, "content": f"Request failed: {str(e)}"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)