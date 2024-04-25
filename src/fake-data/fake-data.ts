import {
  randNumber,
  randParagraph,
  randRecentDate,
  randUserName,
  randTodo,
  seed,
} from "@ngneat/falso";

seed("40");

const randomId = () => randTodo().id.split("-")[0];

const generateRandomIds = (x: number) => new Array(x).fill(x).map(randomId);

export const randomPickFromMap = <T>(theMap: Map<string, T>) =>
  theMap.get(
    [...theMap.keys()][randNumber({ min: 0, max: theMap.size - 1 })]
  ) as T;
export const users = new Map(
  new Array(500).fill(null).map(() => {
    const username = randUserName();
    return [username, username];
  })
);

export const fakeAuthUser = randomPickFromMap(users);

export const messages = new Map(
  generateRandomIds(100).map((msgId) => [
    msgId,
    {
      id: msgId,
      text: randParagraph({ length: randNumber({ min: 1, max: 10 }) }).join(
        "\n"
      ),
      authorId: randomPickFromMap(users),
      publishedAt: randRecentDate(),
    },
  ])
);

export const userLikesByMessage = new Map<string, string[]>();

export const likeByMessages = new Map(
  [...messages.values()].map((msg) => {
    const copyUser = new Map(users);

    return [
      msg.id,
      generateRandomIds(randNumber({ min: 0, max: 150 })).map((likedId) => {
        const userId = randomPickFromMap(copyUser);

        copyUser.delete(userId);

        userLikesByMessage.set(
          msg.id,
          (userLikesByMessage.get(msg.id) ?? []).concat(userId)
        );

        return {
          id: likedId,
          userId,
          messageId: msg.id,
        };
      }),
    ];
  })
);

export const messagesByTimeline = new Map<string, string[]>();

export const timelinesByUser = new Map(
  [...users.values()].map((user) => {
    const copyMessages = new Map(messages);
    const timelineId = randomId();

    const messageIds: string[] = (() => {
      return new Array(10).fill(null).map(() => {
        const messageId = randomPickFromMap(copyMessages).id;
        copyMessages.delete(messageId);
        messagesByTimeline.set(
          timelineId,
          (messagesByTimeline.get(timelineId) ?? []).concat(messageId)
        );

        return messageId;
      });
    })();

    messageIds.sort((mIdA, mIdB) => {
      const [mA, mB] = [messages.get(mIdA), messages.get(mIdB)];

      if (!mA || !mB) return 0;

      return mB.publishedAt.getTime() - mA.publishedAt.getTime();
    });

    return [
      user,
      {
        id: timelineId,
        user,
        messages: messageIds,
      },
    ];
  })
);

export const followersByUser = new Map<string, string[]>(
  [...users.values()].map((u) => {
    const userCopy = new Map(users);
    userCopy.delete(u);

    return [
      u,
      new Array(randNumber({ min: 0, max: userCopy.size }))
        .fill(null)
        .map(() => {
          const userId = randomPickFromMap(userCopy);
          userCopy.delete(userId);

          return userId;
        }),
    ];
  })
);

export const followingByUser = new Map<string, string[]>();

for (const [userId, followers] of followersByUser) {
  followers.forEach((followerId) => {
    const existingFollowing = followingByUser.get(followerId) ?? [];

    followingByUser.set(followerId, existingFollowing.concat(userId));
  });
}


// export const isAuthUserFollowUser = (userId:string) =>(followingByUser.get(userId) ??[]).includes(userId)