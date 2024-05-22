module.exports = function override(config, env) {
    console.log("React app rewired works!")
    config.resolve.fallback = {
      fs: false,
      http: require.resolve('stream-http'),
      assert: false,
      url: false,
    };
    return config;
  };


      // "start": " react-scripts start",
    // "build": " react-scripts build",
    // "test": "react-scripts test",