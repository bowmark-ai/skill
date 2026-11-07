---
name: bowmark-linkedin
description: |
  Read LinkedIn for your agent. The professional network: people, employers, jobs and
  posts. Typed results through Bowmark, tested on a schedule, no LinkedIn API key. Use
  when the user names LinkedIn or a link to linkedin.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# LinkedIn through Bowmark

1. `get_library({ query: "linkedin.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const linkedin = bowmark.providers.linkedin;
return await linkedin.getCompany("anthropic");
```

Public, no sign-in: searchJobs, listCompanyJobs, getCompany, listCompanyPosts, listMemberPosts, getJob, getProfile, searchPeople, getPost, listPostComments, getArticle, getSchool, searchServiceProviders, searchLearningCourses, getLearningCourse.

Your own LinkedIn account (the run returns a sign-in link the first time): getMyProfile, listConnections, getProfileDetails, getProfileSkills, searchMembers, searchCompanies, listCompanyEmployees, searchPosts, getHomeFeed, listConversations, getConversation, listInvitations, listSentInvitations, getProfileViews, listNotifications, listSuggestedConnections, listFollowing, listSavedJobs, listAppliedJobs, listSavedPosts, searchGroups, getGroup, listMyGroups, searchSchools, searchEvents, getEvent, createPost, deletePost, commentOnPost, deleteComment, reactToPost, repostPost, savePost, saveJob, followCompany, followMember, sendConnectionRequest, withdrawInvitation, acceptInvitation, ignoreInvitation, removeConnection, sendMessage, joinGroup, leaveGroup, updateProfile, setProfilePhoto, applyToJob, attendEvent, createGroupPost, subscribeToNewsletter, addProfileSkill, replyToComment.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
