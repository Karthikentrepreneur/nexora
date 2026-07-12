-- --------------------------------------------------------
-- Hostinger MySQL Database Schema for 1GE Homepage Hero
-- Table: home_hero
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `home_hero` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `subtitle` VARCHAR(255) NOT NULL,
  `title` TEXT NOT NULL,
  `video_src` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Seeding default metadata for the homepage hero section
--

INSERT INTO `home_hero` (`subtitle`, `title`, `video_src`) VALUES
('Sustainability Through Innovation', '“Strategic investments for a sustainable, connected future.”', 'video4.mp4');
