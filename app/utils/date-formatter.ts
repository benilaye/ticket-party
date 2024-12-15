export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString();
}

export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString();
}