import { test, expect } from '@playwright/test';
import { ai } from "@zerostep/playwright";
test.describe('Demo QA Tests', () => {
    test('should register a new user', async ({ page }) => {
        // Test for user registration
        await page.goto('https://demoqa.com/')

        console.log('close the ads if any');
        await ai('close the ads if any', {page, test});
        
        console.log('Scroll into and click the button that says "Forms". Repeat if we are not taken to the "/forms" page. Find "Practice Form" in the side menu and click it.');
        await ai('Scroll into and click the button that says "Forms". Repeat if we are not taken to the "/forms" page. Find "Practice Form" in the side menu and click it.', {page, test}); //does not take me into forms. Will ai find fix?
        
        console.log('fill up all the fields with any valid data');
        await ai('fill up all the fields with any valid data', {page, test});
        
        console.log('submit the form');
        await ai('submit the form', {page, test});
        await ai('close the ads if any', {page, test})
        
        await ai('Scroll into and click the button that says "Forms". Find "Practice Form" in the side menu and click it.', {page, test}) //does not take me into forms. Will ai find fix?
        
        
        await ai('fill up all the fields with any valid data', {page, test})
        await ai('submit the form', {page, test})
        

    });

    test('should login with valid credentials', async ({ page }) => {
        // Test for user login
    });

    test('should handle alerts correctly', async ({ page }) => {
        // Test for processing alerts
    });

    test('should interact with dynamic elements', async ({ page }) => {
        // Test for interacting with dynamic elements
    });

    test('should perform table operations', async ({ page }) => {
        // Test for table operations
    });

    test('should navigate and interact with menu', async ({ page }) => {
        // Test for menu operations
    });

    test('should perform drag and drop', async ({ page }) => {
        // Test for drag and drop functionality
    });

    test('should interact with interactive elements', async ({ page }) => {
        // Test for interactive elements
    });
});

