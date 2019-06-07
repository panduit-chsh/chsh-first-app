const issue = require('./lib/issue');

/**
 * Internal cache for tags by repository
 */
let logger;
/**
 * Checks the body of the subject and edits it if it violates one of the
 * configured rules
 *
 * @param {Context} context A github context
 * @param {string} type The type (issue, pull_request or comment) of this event
 * @returns {Promise} A promise that resolves after this event has been handled
 * @async 
 */
async function handleEvent(context, type) {
  
  if ( type == 'issue' ) {
	 return issue.CommentOnIssue(context, type);
  }

  if ( type =='pull_request' ) {
    const prComment = context.pull_request({ body: 'Thanks for opening this pull request!' })
    return context.github.pull_request.createComment(prComment);
  }
  
}

module.exports = app => {
  logger = app.log;
  // see https://developer.github.com/v3/activity/events/types/#issuesevent
  app.on('issues', context => handleEvent(context, 'issue'));
  // see https://developer.github.com/v3/activity/events/types/#pullrequestevent
  app.on('pull_request', context => handleEvent(context, 'pull_request'));
  
  
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}