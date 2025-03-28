
import * as Human from '@vladmandic/human';
import humanConfig from './config';

// Create a singleton instance of Human.js
class HumanInstance {
  private static instance: Human.Human | null = null;
  private static isInitialized = false;
  private static isLoading = false;

  static async getInstance(): Promise<Human.Human> {
    if (!this.instance) {
      this.instance = new Human.Human(humanConfig);
      return this.instance;
    }
    return this.instance;
  }

  static async load(): Promise<Human.Human> {
    if (this.isInitialized) {
      return this.getInstance();
    }
    
    if (this.isLoading) {
      // Wait for initialization to complete
      return new Promise((resolve) => {
        const checkInterval = setInterval(async () => {
          if (this.isInitialized) {
            clearInterval(checkInterval);
            const instance = await this.getInstance();
            resolve(instance);
          }
        }, 100);
      });
    }
    
    try {
      this.isLoading = true;
      const human = await this.getInstance();
      await human.load();
      this.isInitialized = true;
      this.isLoading = false;
      return human;
    } catch (error) {
      this.isLoading = false;
      console.error('Error initializing Human.js:', error);
      throw error;
    }
  }
  
  static reset(): void {
    if (this.instance) {
      // Human.js doesn't have direct dispose/cleanup methods like TensorFlow.js
      // We simply set the instance to null for garbage collection
      this.instance = null;
      this.isInitialized = false;
    }
  }
}

// Export the human instance for use throughout the application
export const human = {
  async detect(input: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement): Promise<Human.Result> {
    const instance = await HumanInstance.load();
    return instance.detect(input);
  },
  
  async load(): Promise<Human.Human> {
    return HumanInstance.load();
  },
  
  reset(): void {
    HumanInstance.reset();
  },
  
  draw: {
    all: async (canvas: HTMLCanvasElement, result: Human.Result): Promise<void> => {
      const instance = await HumanInstance.getInstance();
      await instance.draw.all(canvas, result);
    }
  }
};
