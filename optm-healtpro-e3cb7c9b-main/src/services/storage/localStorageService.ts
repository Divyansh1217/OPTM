
/**
 * Service to handle localStorage operations as a temporary solution
 * until the proper Supabase schema is set up
 */

const STORAGE_PREFIX = 'medical_';

/**
 * Store data in localStorage with a prefixed key
 */
export const storeInLocalStorage = (key: string, data: any): void => {
  try {
    // Get existing data
    const existingData = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    let dataArray = existingData ? JSON.parse(existingData) : [];
    
    // Add new data
    if (Array.isArray(dataArray)) {
      // Replace if item with same ID exists
      const index = dataArray.findIndex((item: any) => item.id === data.id);
      if (index !== -1) {
        dataArray[index] = data;
      } else {
        dataArray.push(data);
      }
    } else {
      dataArray = [data];
    }
    
    // Store updated array
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(dataArray));
    console.log(`Successfully stored data in ${key} storage:`, data.id);
  } catch (error) {
    console.error(`Error storing ${key} in localStorage:`, error);
  }
};

/**
 * Get data from localStorage with a prefixed key
 */
export const getFromLocalStorage = (key: string): any[] => {
  try {
    const data = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    const parsedData = data ? JSON.parse(data) : [];
    console.log(`Retrieved ${parsedData.length} items from ${key} storage`);
    return parsedData;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return [];
  }
};

/**
 * Get a specific item by ID from localStorage
 */
export const getItemByIdFromLocalStorage = (key: string, id: string): any | null => {
  try {
    const items = getFromLocalStorage(key);
    const item = items.find((item: any) => item.id === id);
    console.log(`Retrieved item from ${key} storage:`, item?.id || 'not found');
    return item || null;
  } catch (error) {
    console.error(`Error retrieving item by ID from localStorage:`, error);
    return null;
  }
};

/**
 * Delete a specific item by ID from localStorage
 */
export const deleteItemFromLocalStorage = (key: string, id: string): boolean => {
  try {
    const items = getFromLocalStorage(key);
    const filteredItems = items.filter((item: any) => item.id !== id);
    
    if (items.length === filteredItems.length) {
      // No item was removed
      return false;
    }
    
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(filteredItems));
    console.log(`Deleted item ${id} from ${key} storage`);
    return true;
  } catch (error) {
    console.error(`Error deleting item from localStorage:`, error);
    return false;
  }
};

/**
 * Store blob/file data as base64 in localStorage
 */
export const storeFileInLocalStorage = (key: string, id: string, file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (!event.target?.result) {
          reject(new Error('Failed to read file'));
          return;
        }
        
        // Store file details and blob
        const fileData = {
          id: id,
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
          data: event.target.result, // base64 data
          timestamp: new Date().toISOString()
        };
        
        storeInLocalStorage(`${key}_files`, fileData);
        console.log(`Stored file in ${key}_files storage:`, id);
        resolve(id);
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(`Error storing file in localStorage:`, error);
      reject(error);
    }
  });
};

/**
 * Get a file from localStorage by ID
 */
export const getFileFromLocalStorage = (key: string, id: string): any | null => {
  try {
    return getItemByIdFromLocalStorage(`${key}_files`, id);
  } catch (error) {
    console.error(`Error retrieving file from localStorage:`, error);
    return null;
  }
};

/**
 * Get all files from localStorage
 */
export const getAllFilesFromLocalStorage = (key: string): any[] => {
  try {
    return getFromLocalStorage(`${key}_files`);
  } catch (error) {
    console.error(`Error retrieving all files from localStorage:`, error);
    return [];
  }
};

/**
 * Clear sample data and replace with real data
 */
export const clearSampleDataIfNeeded = (key: string): void => {
  try {
    const realData = getFromLocalStorage(key);
    // If we have real user-entered data, remove any sample/demo data
    // This assumes sample data is marked with a property like "isSample: true"
    if (realData.length > 0) {
      const filteredData = realData.filter((item: any) => !item.isSample);
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(filteredData));
    }
  } catch (error) {
    console.error(`Error clearing sample data for ${key}:`, error);
  }
};
