/**
 * 
 */
module.exports = {
  CommentOnPullRequest(context, type) {
	    const issueComment = context.issue({ body: 'Thanks for opening this Pull Request.!' });
	    return context.github.pull_request.createComment(prComment);
  }
}