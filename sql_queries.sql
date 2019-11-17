ALTER TABLE total_ridership ADD PRIMARY KEY ("Station_ID");
ALTER TABLE weekday_data ADD PRIMARY KEY ("Station_ID");
ALTER TABLE saturday_data ADD PRIMARY KEY ("Station_ID");
ALTER TABLE sunday_holiday_data ADD PRIMARY KEY ("Station_ID");
ALTER TABLE ten_year_ridership ADD PRIMARY KEY ("Station_ID");
ALTER TABLE twitter_sentiment ALTER COLUMN "Date" TYPE date;
ALTER TABLE twitter_sentiment ADD PRIMARY KEY ("Tweet_ID");

SELECT * FROM total_ridership;

