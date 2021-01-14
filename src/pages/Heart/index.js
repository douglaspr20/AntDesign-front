import React, { useState, useEffect } from 'react';
import { Form } from "antd";

import HEARTComment from './HeartComment';
import generateId from 'utils/generateId.js';
import HEART_COMMENT_CATEGORIES from 'enum/HEARTCommentCategories.js';
import MAP_HEART_CATEGORY_TO_COLOR from 'enum/MapHeartCategoryToColor.js';
import CustomInput from 'components/Input';
import CustomButton from "components/Button";

import { getAll, post, put } from "api/module/heart";

import "./style.scss";

const COMMENT_MAX_WORDS_COUNT = 100;

function getWordsCountFromString(str = '') {
  return str.split(' ').length;
}

function HEARTPage() {
  const [heartCards, setHeartCards] = useState([]);
  const [createNewCardState, setCreateNewCardState] = useState(null);
  const [parentComment, setParentComment] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function rateChange({ id, newRate }) {
    try {
      await put({ id, rate: newRate });
      fetchData();
      dismissNewComment();
    } catch (error) {
      console.log(`Heart module error: Put - ${error}`);
    }
  }

  async function fetchData() {
    try {
      let data = await getAll();
      setHeartCards(data.data.heart);
    } catch (error) {
      console.log(`Heart module error: fetchData - ${error}`);
    }
  }

  function startNewComment({ category }) {
    const commentPlaceholder = createNewCardState === null
      ? ({
        id: generateId(20),
        category,
        rate: 0,
        content: '',
        responses: [],
      })
      : { ...createNewCardState, category }

    setCreateNewCardState(commentPlaceholder);
  }

  function dismissNewComment() {
    // dismissNewComment();
    setCreateNewCardState(null);
    setParentComment(null);
  }

  function startNewResponse(response) {
    const { id, category } = response;
    const commentPlaceholder = createNewCardState === null
      ? ({
        id: generateId(20),
        category,
        rate: 0,
        content: '',
        responses: [],
      })
      : { ...createNewCardState, category }
    setParentComment(id)
    startNewComment(commentPlaceholder);
  }

  async function submitNewComment({ content }) {
    let commentToSubmitTemplate = { ...createNewCardState, content, created_at: new Date() }
    try {
      if (parentComment !== null) {
        commentToSubmitTemplate['parentId'] = parentComment;
      }
      await post(commentToSubmitTemplate);
      fetchData();
      dismissNewComment();
    } catch (error) {
      console.log(`Heart module error: Post - ${error}`);
    }
  }

  return (
    <div className="heart-page">
      <div className="heart-page__container">
        <header className="heart-page__header">
          <h2 className="text-center">
            There will be some explaining text
          </h2>
        </header>

        <section className="heart-categories__row">
          {Object.keys(HEART_COMMENT_CATEGORIES).map((catKey, i) => (
            <div className="heart-categories__col"
              key={catKey}
            >
              <button
                className={`
                  heart-categories__button
                  border-color--${MAP_HEART_CATEGORY_TO_COLOR[HEART_COMMENT_CATEGORIES[catKey].name]}
                `}
                onClick={() => startNewComment({ category: HEART_COMMENT_CATEGORIES[catKey].name })}
              >
                <span
                  className="heart-categories__button-ico"
                  style={{
                    backgroundImage: `url(${HEART_COMMENT_CATEGORIES[catKey].icon})`,
                  }}
                ></span>
                <span className="heart-truncate">
                  {HEART_COMMENT_CATEGORIES[catKey].title}
                </span>
              </button>
            </div>
          ))}
        </section>

        {(createNewCardState && createNewCardState.id) &&
          <section className="heart-new-comment__wrap">
            <Form
              onFinish={submitNewComment}
            >
              <Form.Item
                name="content"
                rules={[
                  {
                    required: true,
                    message: "Please enter your comment",
                  },
                  () => ({
                    validator(_, value) {
                      if (getWordsCountFromString(value) > COMMENT_MAX_WORDS_COUNT) {
                        return Promise.reject(
                          "Comment length should be up to 100 words"
                        );
                      }
                      return Promise.resolve();
                      
                    },
                  }),
                ]}
              >
                <CustomInput multiple placeholder="Please enter your comment" />
              </Form.Item>

              <div className="heart-new-comment__cta-wrap">
                <CustomButton
                  htmlType="button"
                  text="Cancel"
                  type="default"
                  size="md"
                  onClick={dismissNewComment}
                />

                <CustomButton
                  htmlType="submit"
                  text="Post Comment"
                  type="primary"
                  size="lg"
                />
              </div>

            </Form>

          </section>
        }

        <section className="heart-cards-list__wrap">
          {heartCards.map(item => (
            <HEARTComment
              key={item.id}
              category={item.category}
              rate={item.rate}
              content={item.content}
              icon={HEART_COMMENT_CATEGORIES[item.category].icon}
              id={item.id}
              allowResponses
              rateChange={rateChange}
              onClick={() => { startNewResponse(item); }}
            >
              {item.hasOwnProperty("responses") ? item.responses.map(response => (
                <HEARTComment
                  key={response.id}
                  id={response.id}
                  category={response.category}
                  content={response.content}
                  icon={HEART_COMMENT_CATEGORIES[response.category].icon}
                />
              )) : null}
            </HEARTComment>
          ))}
        </section>
      </div>
    </div>
  )
}

export default HEARTPage;
