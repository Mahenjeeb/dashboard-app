const dateFormatPipeline = [
  {
    $addFields: {
      createdAt: {
        $dateToString: {
          format: "%d/%m/%Y %H:%M:%S",
          date: "$createdAt",
          timezone: "Asia/Kolkata",
        },
      },
      expireAt: {
        $dateToString: {
          format: "%d/%m/%Y %H:%M:%S",
          date: "$expireAt",
          timezone: "Asia/Kolkata",
        },
      },
      updatedAt: {
        $dateToString: {
          format: "%d/%m/%Y %H:%M:%S",
          date: "$updatedAt",
          timezone: "Asia/Kolkata",
        },
      },
    },
  },
  {
    $project: {
      refreshToken: 0,
      itoken: 0,
      password: 0,
      __v: 0
    },
  },
];

export default dateFormatPipeline;
