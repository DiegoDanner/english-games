import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        base_path = os.path.abspath("jules-scratch")

        await page.goto(f"file://{base_path}/test.html")
        await page.screenshot(path="jules-scratch/verification/test-light.png")
        await page.click("#toggle")
        await page.wait_for_timeout(1000) # 1 second delay
        await page.screenshot(path="jules-scratch/verification/test-dark.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
