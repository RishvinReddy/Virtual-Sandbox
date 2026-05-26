document.addEventListener('DOMContentLoaded', () => {
    const activityContainer = document.getElementById('github-activity-container');
    if (!activityContainer) return;
  
    // GitHub username
    const username = 'rishvinreddy';
  
    const fetchActivity = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/events/public`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        // Filter out for PushEvents or CreateEvents
        const recentCodeEvent = data.find(event => event.type === 'PushEvent' || event.type === 'CreateEvent' || event.type === 'PullRequestEvent');
        
        if (recentCodeEvent) {
          const repoName = recentCodeEvent.repo.name.replace(`${username}/`, '');
          let actionText = 'Contributed to';
          
          if (recentCodeEvent.type === 'PushEvent') {
            actionText = 'Pushed commits to';
          } else if (recentCodeEvent.type === 'PullRequestEvent') {
            actionText = 'Opened PR on';
          }
  
          // Calculate time ago
          const eventDate = new Date(recentCodeEvent.created_at);
          const now = new Date();
          const diffMs = now - eventDate;
          const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
          const diffDays = Math.floor(diffHrs / 24);
          
          let timeAgo = 'Just now';
          if (diffHrs > 0 && diffHrs < 24) timeAgo = `${diffHrs}h ago`;
          else if (diffDays > 0) timeAgo = `${diffDays}d ago`;
  
          activityContainer.innerHTML = `
            <div class="live-activity-badge">
              <div class="pulsing-dot"></div>
              <span><strong>Live:</strong> ${actionText} <a href="https://github.com/${recentCodeEvent.repo.name}" target="_blank" rel="noopener noreferrer" style="color: var(--primary); text-decoration: none;">${repoName}</a> (${timeAgo})</span>
            </div>
          `;
        } else {
            // Fallback if no recent events found or rate limited gracefully
            activityContainer.innerHTML = `
                <div class="live-activity-badge">
                    <div class="pulsing-dot" style="background: var(--text-secondary);"></div>
                    <span><strong>Status:</strong> Systems operational. Available for engineering contracts.</span>
                </div>
            `;
        }
      } catch (error) {
        console.error('Error fetching GitHub activity:', error);
        // Silent failure UI fallback
        activityContainer.innerHTML = `
            <div class="live-activity-badge">
              <div class="pulsing-dot" style="background: var(--text-secondary);"></div>
              <span><strong>Status:</strong> Systems operational. Available for engineering contracts.</span>
            </div>
        `;
      }
    };
  
    fetchActivity();
  });
