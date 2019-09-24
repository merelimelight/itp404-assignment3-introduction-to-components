export async function getPosts(searchTerm)
{
    let response = await fetch(`https://www.reddit.com/r/${searchTerm}.json`);
    let posts = await response.json();

    return posts.data.children;
}