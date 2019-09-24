const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

if(process.env.NODE.ENV !== 'production') require('dotnev').config();
