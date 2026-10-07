export interface StudentRecord {
  id: string;
  name: string;
  score: number;
  total: number;
  accuracy: number;
  timeTaken: string;
  date: string;
  badge: string;
}

export const defaultStudentsRoster: StudentRecord[] = [
  { id: 'std-1', name: 'Sumit Kumar', score: 28, total: 30, accuracy: 93, timeTaken: '11m 45s', date: 'Today, 09:30 AM', badge: 'Outstanding ★' },
  { id: 'std-2', name: 'Ananya Sharma', score: 29, total: 30, accuracy: 97, timeTaken: '10m 12s', date: 'Today, 09:15 AM', badge: 'Topper 👑' },
  { id: 'std-3', name: 'Rahul Verma', score: 27, total: 30, accuracy: 90, timeTaken: '12m 20s', date: 'Today, 08:45 AM', badge: 'Distinction' },
  { id: 'std-4', name: 'Priya Patel', score: 26, total: 30, accuracy: 87, timeTaken: '13m 10s', date: 'Today, 08:20 AM', badge: 'First Class' },
  { id: 'std-5', name: 'Amit Singh', score: 25, total: 30, accuracy: 83, timeTaken: '12m 55s', date: 'Yesterday, 07:40 PM', badge: 'First Class' },
  { id: 'std-6', name: 'Neha Gupta', score: 28, total: 30, accuracy: 93, timeTaken: '11m 05s', date: 'Yesterday, 06:15 PM', badge: 'Outstanding ★' },
  { id: 'std-7', name: 'Aditya Yadav', score: 24, total: 30, accuracy: 80, timeTaken: '14m 10s', date: 'Yesterday, 05:30 PM', badge: 'Good' },
  { id: 'std-8', name: 'Sneha Mukherjee', score: 27, total: 30, accuracy: 90, timeTaken: '11m 50s', date: 'Yesterday, 04:50 PM', badge: 'Distinction' },
  { id: 'std-9', name: 'Rohan Joshi', score: 23, total: 30, accuracy: 77, timeTaken: '13m 40s', date: 'Yesterday, 03:25 PM', badge: 'Good' },
  { id: 'std-10', name: 'Kavita Rawat', score: 26, total: 30, accuracy: 87, timeTaken: '12m 15s', date: 'Yesterday, 02:10 PM', badge: 'First Class' },
  { id: 'std-11', name: 'Manish Tiwari', score: 22, total: 30, accuracy: 73, timeTaken: '14m 02s', date: '2 days ago', badge: 'Passed' },
  { id: 'std-12', name: 'Pooja Choudhary', score: 28, total: 30, accuracy: 93, timeTaken: '10m 50s', date: '2 days ago', badge: 'Outstanding ★' },
  { id: 'std-13', name: 'Vikas Meena', score: 25, total: 30, accuracy: 83, timeTaken: '13m 05s', date: '2 days ago', badge: 'First Class' },
  { id: 'std-14', name: 'Divya Nair', score: 29, total: 30, accuracy: 97, timeTaken: '09m 55s', date: '2 days ago', badge: 'Topper 👑' },
  { id: 'std-15', name: 'Sanjay Rathore', score: 21, total: 30, accuracy: 70, timeTaken: '14m 30s', date: '2 days ago', badge: 'Passed' },
  { id: 'std-16', name: 'Ritika Sen', score: 27, total: 30, accuracy: 90, timeTaken: '11m 30s', date: '3 days ago', badge: 'Distinction' },
  { id: 'std-17', name: 'Harsh Vardhan', score: 26, total: 30, accuracy: 87, timeTaken: '12m 45s', date: '3 days ago', badge: 'First Class' },
  { id: 'std-18', name: 'Shreya Das', score: 25, total: 30, accuracy: 83, timeTaken: '13m 15s', date: '3 days ago', badge: 'First Class' },
  { id: 'std-19', name: 'Alok Mishra', score: 24, total: 30, accuracy: 80, timeTaken: '13m 50s', date: '3 days ago', badge: 'Good' },
  { id: 'std-20', name: 'Swati Kulkarni', score: 28, total: 30, accuracy: 93, timeTaken: '10m 40s', date: '3 days ago', badge: 'Outstanding ★' },
  { id: 'std-21', name: 'Gaurav Chauhan', score: 22, total: 30, accuracy: 73, timeTaken: '14m 15s', date: '4 days ago', badge: 'Passed' },
  { id: 'std-22', name: 'Megha Reddy', score: 29, total: 30, accuracy: 97, timeTaken: '10m 20s', date: '4 days ago', badge: 'Topper 👑' },
  { id: 'std-23', name: 'Nikhil Saxena', score: 23, total: 30, accuracy: 77, timeTaken: '13m 35s', date: '4 days ago', badge: 'Good' },
  { id: 'std-24', name: 'Tanvi Bhatia', score: 27, total: 30, accuracy: 90, timeTaken: '11m 15s', date: '4 days ago', badge: 'Distinction' },
  { id: 'std-25', name: 'Deepak Pandey', score: 25, total: 30, accuracy: 83, timeTaken: '12m 50s', date: '5 days ago', badge: 'First Class' },
  { id: 'std-26', name: 'Isha Aggarwal', score: 28, total: 30, accuracy: 93, timeTaken: '11m 20s', date: '5 days ago', badge: 'Outstanding ★' },
  { id: 'std-27', name: 'Rakesh Soni', score: 20, total: 30, accuracy: 67, timeTaken: '14m 50s', date: '5 days ago', badge: 'Passed' },
  { id: 'std-28', name: 'Simran Kaur', score: 26, total: 30, accuracy: 87, timeTaken: '12m 30s', date: '5 days ago', badge: 'First Class' },
  { id: 'std-29', name: 'Kunal Thakur', score: 24, total: 30, accuracy: 80, timeTaken: '13m 25s', date: '6 days ago', badge: 'Good' },
  { id: 'std-30', name: 'Ankita Ghosh', score: 27, total: 30, accuracy: 90, timeTaken: '11m 40s', date: '6 days ago', badge: 'Distinction' },
  { id: 'std-31', name: 'Mohit Dubey', score: 22, total: 30, accuracy: 73, timeTaken: '14m 05s', date: '6 days ago', badge: 'Passed' },
  { id: 'std-32', name: 'Prachi Jain', score: 29, total: 30, accuracy: 97, timeTaken: '10m 05s', date: '6 days ago', badge: 'Topper 👑' },
  { id: 'std-33', name: 'Tarun Sharma', score: 25, total: 30, accuracy: 83, timeTaken: '12m 40s', date: '7 days ago', badge: 'First Class' },
  { id: 'std-34', name: 'Aayushi Verma', score: 28, total: 30, accuracy: 93, timeTaken: '11m 10s', date: '7 days ago', badge: 'Outstanding ★' },
  { id: 'std-35', name: 'Chetan Rathi', score: 21, total: 30, accuracy: 70, timeTaken: '14m 45s', date: '7 days ago', badge: 'Passed' },
  { id: 'std-36', name: 'Nandini Shukla', score: 26, total: 30, accuracy: 87, timeTaken: '12m 20s', date: '7 days ago', badge: 'First Class' },
  { id: 'std-37', name: 'Praveen Bishnoi', score: 24, total: 30, accuracy: 80, timeTaken: '13m 15s', date: '8 days ago', badge: 'Good' },
  { id: 'std-38', name: 'Garima Rajput', score: 27, total: 30, accuracy: 90, timeTaken: '11m 35s', date: '8 days ago', badge: 'Distinction' },
  { id: 'std-39', name: 'Vivek Tripathi', score: 23, total: 30, accuracy: 77, timeTaken: '13m 45s', date: '8 days ago', badge: 'Good' },
  { id: 'std-40', name: 'Rashmi Deshmukh', score: 28, total: 30, accuracy: 93, timeTaken: '10m 55s', date: '8 days ago', badge: 'Outstanding ★' },
  { id: 'std-41', name: 'Yashwardhan Singh', score: 25, total: 30, accuracy: 83, timeTaken: '12m 35s', date: '9 days ago', badge: 'First Class' },
  { id: 'std-42', name: 'Bhavna Bhatt', score: 29, total: 30, accuracy: 97, timeTaken: '09m 45s', date: '9 days ago', badge: 'Topper 👑' },
  { id: 'std-43', name: 'Kartik Somani', score: 22, total: 30, accuracy: 73, timeTaken: '14m 10s', date: '9 days ago', badge: 'Passed' },
  { id: 'std-44', name: 'Pallavi Chhabra', score: 26, total: 30, accuracy: 87, timeTaken: '12m 05s', date: '9 days ago', badge: 'First Class' },
  { id: 'std-45', name: 'Lalit Maurya', score: 20, total: 30, accuracy: 67, timeTaken: '14m 55s', date: '10 days ago', badge: 'Passed' },
  { id: 'std-46', name: 'Monika Goel', score: 27, total: 30, accuracy: 90, timeTaken: '11m 25s', date: '10 days ago', badge: 'Distinction' },
  { id: 'std-47', name: 'Sourabh Khandelwal', score: 24, total: 30, accuracy: 80, timeTaken: '13m 20s', date: '10 days ago', badge: 'Good' },
  { id: 'std-48', name: 'Kritika Pillai', score: 28, total: 30, accuracy: 93, timeTaken: '10m 50s', date: '10 days ago', badge: 'Outstanding ★' },
  { id: 'std-49', name: 'Abhishek Dixit', score: 23, total: 30, accuracy: 77, timeTaken: '13m 50s', date: '11 days ago', badge: 'Good' },
  { id: 'std-50', name: 'Sakshi Malviya', score: 25, total: 30, accuracy: 83, timeTaken: '12m 45s', date: '11 days ago', badge: 'First Class' }
];

const STORAGE_KEY = 'determiners_50_students_records';

export function getStoredStudents(): StudentRecord[] {
  if (typeof window === 'undefined') return defaultStudentsRoster;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    // fallback
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStudentsRoster));
  } catch (e) {}
  return defaultStudentsRoster;
}

export function saveStudentRecord(newRecord: Omit<StudentRecord, 'id'>): StudentRecord[] {
  const current = getStoredStudents();
  const record: StudentRecord = {
    ...newRecord,
    id: `std-${Date.now()}`
  };
  // Place newest at the top, retain 50 records
  const updated = [record, ...current.filter(r => r.name.toLowerCase() !== newRecord.name.toLowerCase())].slice(0, 50);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {}
  return updated;
}
