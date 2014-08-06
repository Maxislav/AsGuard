-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Май 21 2014 г., 15:49
-- Версия сервера: 5.5.34
-- Версия PHP: 5.3.10-1ubuntu3.9

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `monitoring`
--

-- --------------------------------------------------------

--
-- Структура таблицы `dtp`
--

CREATE TABLE IF NOT EXISTS `dtp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lat` text CHARACTER SET utf8,
  `lng` text CHARACTER SET utf8,
  `datetime` text CHARACTER SET utf8,
  `address` text CHARACTER SET utf8,
  `comment` text CHARACTER SET utf8,
  `accept` text CHARACTER SET utf8,
  `remotetime` text CHARACTER SET utf8,
  `type` text CHARACTER SET utf8,
  `hurt` int(1) NOT NULL DEFAULT '1',
  `gai` int(1) NOT NULL DEFAULT '0',
  `ambulance` int(1) NOT NULL DEFAULT '0',
  `sms` tinyint(1) NOT NULL DEFAULT '0',
  `mail` tinyint(1) NOT NULL DEFAULT '0',
  `repost` tinyint(1) NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `login` text CHARACTER SET utf8,
  `mh` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=43 ;

--
-- Дамп данных таблицы `dtp`
--

INSERT INTO `dtp` (`id`, `lat`, `lng`, `datetime`, `address`, `comment`, `accept`, `remotetime`, `type`, `hurt`, `gai`, `ambulance`, `sms`, `mail`, `repost`, `active`, `login`, `mh`) VALUES
(40, '50.5221038708341', '30.750217437744137', '150821121141', 'Комарова 1', 'Едет на коне Илья Муромец. Подъезжает к перекрестку и читает надпись на валуне: "Направо пойдешь - коня потеряешь, прямо пойдешь - голову потеряешь, налево пойдешь - я тебя сама отмутузю. Василиса.".', 'Тарик', '', 'malfunction', 3, 1, 1, 1, 1, 1, 1, 'admin!', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
