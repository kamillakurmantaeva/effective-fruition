import React, { useState, useRef } from 'react';
import {
  Button,
  Collapse,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import code from './code';
import './styles.css';

const DEFAULT_DOMAIN = 'effectivefruition.happy.do';
const DEFAULT_NOTION_URL =
  'https://effective-fruition.notion.site/424f083e8d2f451cae546c0aebe02c10';

function validDomain(domain) {
  return domain.match(
    /^((https:\/\/)|(http:\/\/))?[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+(\/)?$/
  );
}

function validNotionUrl(url) {
  if (!url) return true;
  try {
    const link = new URL(url);
    return (
      (link.hostname.endsWith('notion.so') ||
        link.hostname.endsWith('notion.site')) &&
      link.pathname.slice(-32).match(/[0-9a-f]{32}/)
    );
  } catch (e) {
    return false;
  }
}

export default function App() {
  const [slugs, setSlugs] = useState([]);
  const [meta, setMeta] = useState([]);
  const [fieldNames, setFieldNames] = useState([]);
  const [myDomain, setMyDomain] = useState('');
  const [notionUrl, setNotionUrl] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [pageDescription, setPageDescription] = useState('');
  const [googleFont, setGoogleFont] = useState('');
  const [customScript, setCustomScript] = useState('');
  const [optional, setOptional] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleMyDomain = (e) => {
    setMyDomain(e.target.value);
    setCopied(false);
  };
  const handleNotionUrl = (e) => {
    setNotionUrl(e.target.value);
    setCopied(false);
  };
  const handlePageTitle = (e) => {
    setPageTitle(e.target.value);
    setCopied(false);
  };
  const handlePageDescription = (e) => {
    setPageDescription(e.target.value);
    setCopied(false);
  };
  const handleGoogleFont = (e) => {
    setGoogleFont(e.target.value);
    setCopied(false);
  };
  const handleCustomScript = (e) => {
    setCustomScript(e.target.value);
    setCopied(false);
  };
  const addSlug = () => {
    setSlugs([...slugs, ['', '']]);
    setCopied(false);
  };
  const addMeta = () => {
    setMeta([...meta, ['', '', '']]);
    setCopied(false);
  };
  const addHiddenFieldNames = () => {
    setFieldNames([...fieldNames, ['', [], fieldNames.length]]);
    setCopied(false);
  };
  const addHiddenField = (index) => {
    const newFields = fieldNames.slice();
    newFields[index][1].push('');
    setFieldNames(newFields);
    setCopied(false);
  };
  const deleteSlug = (index) => {
    setSlugs([...slugs.slice(0, index), ...slugs.slice(index + 1)]);
    setCopied(false);
  };
  const deleteMeta = (index) => {
    setMeta([...meta.slice(0, index), ...meta.slice(index + 1)]);
    setCopied(false);
  };
  const deleteHiddenFieldNames = (index) => {
    setFieldNames([
      ...fieldNames.slice(0, index),
      ...fieldNames.slice(index + 1),
    ]);
    setCopied(false);
  };
  const deleteHiddenField = (indexOfFieldNames, indexOfFieldName) => {
    const newFields = fieldNames.slice();
    newFields[indexOfFieldNames][1].splice(indexOfFieldName, 1);
    setFieldNames(newFields);
    setCopied(false);
  };
  const handleCustomURL = (value, index) => {
    setSlugs([
      ...slugs.slice(0, index),
      [value, slugs[index][1]],
      ...slugs.slice(index + 1),
    ]);
    setCopied(false);
  };
  const handleMetaTitle = (value, index) => {
    setMeta([
      ...meta.slice(0, index),
      [meta[index][0], value, meta[index][2]],
      ...meta.slice(index + 1),
    ]);
    setCopied(false);
  };
  const handleMetaDescription = (value, index) => {
    setMeta([
      ...meta.slice(0, index),
      [meta[index][0], meta[index][1], value],
      ...meta.slice(index + 1),
    ]);
    setCopied(false);
  };
  const handleNotionPageURL = (value, index) => {
    setSlugs([
      ...slugs.slice(0, index),
      [slugs[index][0], value],
      ...slugs.slice(index + 1),
    ]);
    setCopied(false);
  };
  const handleNotionPageURLMeta = (value, index) => {
    setMeta([
      ...meta.slice(0, index),
      [value, meta[index][1], meta[index][2]],
      ...meta.slice(index + 1),
    ]);
    setCopied(false);
  };
  const handleNotionPageURLField = (value, index) => {
    setFieldNames([
      ...fieldNames.slice(0, index),
      [value, fieldNames[index][1], fieldNames[index][2]],
      ...fieldNames.slice(index + 1),
    ]);
    setCopied(false);
  };
  const handleFieldNames = (value, indexOfFieldNames, indexOfFieldName) => {
    const newFields = fieldNames.slice();
    newFields[indexOfFieldNames][1][indexOfFieldName] = value;
    setFieldNames(newFields);
    setCopied(false);
  };
  const handleOptional = () => {
    setOptional(!optional);
  };
  const domain = myDomain || DEFAULT_DOMAIN;
  const url = notionUrl || DEFAULT_NOTION_URL;
  const myDomainHelperText = !validDomain(domain)
    ? 'Please enter a valid domain'
    : undefined;
  const notionUrlHelperText = !validNotionUrl(notionUrl)
    ? 'Please enter a valid Notion Page URL'
    : undefined;
  const noError = !myDomainHelperText && !notionUrlHelperText;
  const script = noError
    ? code({
        myDomain: domain,
        notionUrl: url,
        slugs,
        meta,
        fieldNames,
        pageTitle,
        pageDescription,
        googleFont,
        customScript,
      })
    : undefined;
  const textarea = useRef('');
  const copy = () => {
    if (!noError) return;
    textarea.current.select();
    document.execCommand('copy');
    setCopied(true);
  };
  return (
    <section style={{ maxWidth: 666 }}>
      <Typography variant="h5">
        Enter your domain name and Notion URL
      </Typography>
      <TextField
        fullWidth
        helperText={myDomainHelperText}
        label="Your Domain (e.g. example.org)"
        onChange={handleMyDomain}
        margin="normal"
        placeholder={DEFAULT_DOMAIN}
        value={myDomain}
        variant="outlined"
      />
      <TextField
        fullWidth
        helperText={notionUrlHelperText}
        label={`Notion URL for ${domain}`}
        margin="normal"
        onChange={handleNotionUrl}
        placeholder={DEFAULT_NOTION_URL}
        value={notionUrl}
        variant="outlined"
      />
      <Typography variant="subtitle1" style={{ marginTop: 30 }}>
        Add links to the page
      </Typography>
      <Divider />
      {slugs.map(([customUrl, notionPageUrl], index) => {
        return (
          <section>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{`${domain}/`}</InputAdornment>
                ),
              }}
              key="key"
              label="Link"
              margin="normal"
              placeholder="about"
              onChange={(e) => handleCustomURL(e.target.value, index)}
              value={customUrl}
              variant="outlined"
            />
            <TextField
              fullWidth
              label={`Notion URL for ${domain}/${customUrl || 'about'}`}
              key="value"
              margin="normal"
              placeholder={DEFAULT_NOTION_URL}
              onChange={(e) => handleNotionPageURL(e.target.value, index)}
              value={notionPageUrl}
              variant="outlined"
            />
            <Button
              onClick={() => deleteSlug(index)}
              variant="outlined"
              color="secondary"
              size="small"
            >
              Delete this link
            </Button>
          </section>
        );
      })}
      <section>
        <Button
          onClick={addSlug}
          size="small"
          variant="outlined"
          color="primary"
        >
          Add link
        </Button>
      </section>
      <Typography variant="subtitle1" style={{ marginTop: 30 }}>
        Add URL for change page metadata
      </Typography>
      <Divider />
      {meta.map(([notionPageUrl, title, description], index) => {
        return (
          <section>
            <TextField
              fullWidth
              label={`Notion URL of pages to change meta`}
              key="key"
              margin="normal"
              placeholder={DEFAULT_NOTION_URL}
              onChange={(e) => handleNotionPageURLMeta(e.target.value, index)}
              value={notionPageUrl}
              variant="outlined"
            />
            <TextField
              fullWidth
              key="value"
              label="Page meta title"
              margin="normal"
              placeholder="Effective Fruition"
              onChange={(e) => handleMetaTitle(e.target.value, index)}
              value={title}
              variant="outlined"
            />
            <TextField
              fullWidth
              key="value"
              label="Page meta description"
              margin="normal"
              placeholder="Fruition Empowerment Website"
              onChange={(e) => handleMetaDescription(e.target.value, index)}
              value={description}
              variant="outlined"
            />
            <Button
              onClick={() => deleteMeta(index)}
              variant="outlined"
              color="secondary"
              size="small"
            >
              Delete this metadata
            </Button>
          </section>
        );
      })}
      <section>
        <Button
          onClick={addMeta}
          size="small"
          variant="outlined"
          color="primary"
        >
          Add URL
        </Button>
      </section>
      <Typography variant="subtitle1" style={{ marginTop: 30 }}>
        Add rules for hide fields on the page
      </Typography>
      <Divider />
      {fieldNames.map(([notionPageUrl, fieldName = [], id], index) => {
        return (
          <section key={id}>
            <TextField
              fullWidth
              label={`Notion URL of pages to hidden fields`}
              key="key"
              margin="normal"
              placeholder={DEFAULT_NOTION_URL}
              onChange={(e) => handleNotionPageURLField(e.target.value, index)}
              value={notionPageUrl}
              variant="outlined"
            />
            {fieldName.map((field, i) => {
              return (
                <>
                  <TextField
                    fullWidth
                    label="Hidden field name"
                    margin="normal"
                    placeholder="User email"
                    onChange={(e) => handleFieldNames(e.target.value, index, i)}
                    value={field}
                    variant="outlined"
                  />
                  <Button
                    onClick={() => deleteHiddenField(index, i)}
                    variant="outlined"
                    color="secondary"
                    size="small"
                  >
                    Remove field
                  </Button>
                </>
              );
            })}
            <section>
              <Button
                onClick={() => addHiddenField(index)}
                variant="outlined"
                color="primary"
                size="small"
                style={{ marginBottom: 20 }}
              >
                Add field
              </Button>
            </section>
            <Button
              onClick={() => deleteHiddenFieldNames(index)}
              variant="outlined"
              color="secondary"
              size="small"
            >
              Remove rule for hide fields on the page
            </Button>
          </section>
        );
      })}
      <section>
        <Button
          onClick={addHiddenFieldNames}
          size="small"
          variant="outlined"
          color="primary"
        >
          Add rule
        </Button>
      </section>
      <Typography variant="subtitle1" style={{ marginTop: 30 }}>
        Toggle Style And Script Settings
      </Typography>
      <Divider />
      <section>
        <Button
          onClick={handleOptional}
          size="small"
          variant="outlined"
          color="primary"
        >
          Change
        </Button>
      </section>
      <Collapse in={optional} timeout="auto" unmountOnExit>
        <TextField
          fullWidth
          label="Page Title"
          margin="normal"
          onChange={handlePageTitle}
          value={pageTitle}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Page Description"
          margin="normal"
          onChange={handlePageDescription}
          value={pageDescription}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Custom Google Font"
          margin="normal"
          placeholder="Open Sans"
          onChange={handleGoogleFont}
          value={googleFont}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Paste Your Custom Script"
          margin="normal"
          multiline
          placeholder="e.g. Google Analytics"
          onChange={handleCustomScript}
          rows={2}
          value={customScript}
          variant="outlined"
        />
      </Collapse>
      <section style={{ marginTop: 30 }}>
        <Button
          disabled={!noError}
          variant="contained"
          color="primary"
          disableElevation
          onClick={copy}
        >
          {copied ? 'Copied!' : 'Copy the code'}
        </Button>
      </section>
      {noError ? (
        <>
          <TextField
            fullWidth
            margin="normal"
            rowsMax={5}
            multiline
            inputRef={textarea}
            value={script}
            variant="outlined"
          />
        </>
      ) : (
        ''
      )}
    </section>
  );
}
